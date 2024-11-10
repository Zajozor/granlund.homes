import express, { Request, Response } from 'express';
import cors from 'cors';
import { randomUUID } from 'crypto';
import { PrismaClient } from '@prisma/client';
import { processImage } from './images';

const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json({ limit: 100000000000 }));
app.use(
  express.urlencoded({
    extended: true,
    limit: 1000000000000,
    parameterLimit: 50000
  })
);
app.use(cors());

app.get('/', (_: Request, res: Response) => {
  res.send('Hello, Junction! This is our fancy API <3 granlund.homes');
});

app.post('/properties/create', async (req, res) => {
  const property = await prisma.property.create({
    data: {
      id: randomUUID().toString(),
      address: req.body.address,

      image: req.body.images.map((image: string) => Buffer.from(image))
    }
  });
  const { image, ...rest } = property;
  res.json({ image: image.map((i: Buffer) => i.toString()), ...rest });
});

// List all properties
app.get('/properties', async (_, res) => {
  const properties = await prisma.property.findMany({
    select: {
      id: true,
      address: true,
      created_at: true,
      image: true
    },

    orderBy: { created_at: 'desc' }
  });

  res.json(properties.map(({ image, ...property }) => ({ ...property, floors: image.length })));
});

app.get('/properties/:id/items', async (req, res) => {
  const items = (
    await prisma.item.findMany({ where: { property_id: req.params.id }, include: { catalogue: true } })
  ).map(item => {
    return { ...item, image: item.image?.toString() ?? null };
  });
  res.json(items);
});

app.get('/properties/:id', async (req, res) => {
  const allItems = (
    await prisma.item.findMany({ where: { property_id: req.params.id }, include: { catalogue: true } })
  ).map(item => ({
    id: item.id,
    coordinates: !item.xy_coordinates
      ? ''
      : (item.xy_coordinates as unknown as { x: string }).x + ',' + (item.xy_coordinates as unknown as { y: string }).y,
    name: item.catalogue.name,
    installationDate: item.installation_date,
    serialNumber: item.catalogue.serial_number,
    category: item.catalogue.category
  }));
  const { image, ...property } = await prisma.property.findFirstOrThrow({ where: { id: req.params.id } });

  res.json({
    property: { image: image.map(i => i.toString()), ...property },
    items: {
      electric: allItems.filter(item => item.category === 'electric'),
      hvac: allItems.filter(item => item.category === 'hvac'),
      plumbing: allItems.filter(item => item.category === 'plumbing'),
      utilities: allItems.filter(item => item.category === 'utilities'),
      structural: allItems.filter(item => item.category === 'structural'),
      appliances: allItems.filter(item => item.category === 'appliances'),
      landscaping: allItems.filter(item => item.category === 'landscaping'),
      security: allItems.filter(item => item.category === 'security'),
      other: allItems.filter(
        item =>
          ![
            'electric',
            'hvac',
            'plumbing',
            'utilities',
            'structural',
            'appliances',
            'landscaping',
            'security'
          ].includes(item.category)
      )
    }
  });
});

app.get('/properties/:id/items', async (req, res) => {
  const items = await prisma.item.findMany({
    where: {
      property_id: req.params.id
    },
    include: {
      catalogue: true,
      issues: true
    }
  });
  res.json(
    items.map(item => {
      const { image, ...restItem } = item;
      return { image: image?.toString(), ...restItem };
    })
  );
});

app.delete('/items/:id', async (req, res) => {
  await prisma.item.delete({
    where: {
      id: req.params.id
    }
  });
  res.json({ result: 'ok' });
});

app.post('/properties/:id/items', async (req, res) => {
  const property = await prisma.property.findFirst({
    where: {
      id: req.params.id
    }
  });
  if (property === null) {
    res.status(404);
    res.json({ error: 'property not found' });
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageInfo: any = req.body.image ? await processImage(req.body.image) : {};
  const catalogue = await prisma.catalogue.create({
    data: {
      id: randomUUID().toString(),
      serial_number: req.body.serial_number || imageInfo?.serial_number || '',
      name: req.body.name || imageInfo?.name || '-',
      category: imageInfo?.category || '',
      manufacturer: req.body.manufacturer || imageInfo?.manufacturer || '-',

      other_data: imageInfo?.other_data || {},
      manual_url: imageInfo?.manual_url || ''
    }
  });
  const { image, ...restItem } = await prisma.item.create({
    data: {
      id: randomUUID().toString(),
      image: Buffer.from(req.body.image),
      catalogue_id: catalogue.id,
      property_id: property.id,
      xy_coordinates: req.body.xy_coordinates,
      condition_notes: req.body.notes || ''
    }
  });
  res.json({ catalogue, item: { ...restItem, image: image?.toString() } });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
