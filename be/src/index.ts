import express, { Request, Response } from 'express';
import cors from 'cors';
import { randomUUID } from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.get('/', (_: Request, res: Response) => {
  res.send('Hello, Junction! This is our fancy API <3 granlund.homes');
});

app.post('/properties/create', async (req, res) => {
  const property = await prisma.property.create({
    data: {
      id: randomUUID().toString(),
      address: req.body.address,
      image: [Buffer.from(req.body.image)]
    }
  });
  res.json(property);
});

// List all properties
app.get('/properties', async (_, res) => {
  const properties = await prisma.property.findMany();
  res.json(properties);
});

app.get('/properties/:id', async (req, res) => {
  const allItems = (
    await prisma.item.findMany({ where: { property_id: req.params.id }, include: { catalogue: true } })
  ).map(item => ({
    coordinates: !item.xy_coordinates
      ? ''
      : (item.xy_coordinates as unknown as { x: string }).x + ',' + (item.xy_coordinates as unknown as { y: string }).y,
    name: item.catalogue.name,
    installationDate: item.installation_date,
    serialNumber: item.catalogue.serial_number,
    category: item.catalogue.category
  }));
  const cata = await prisma.catalogue.create({
    data: {
      serial_number: '1242',
      name: 'super-huge-washing-mashine',
      category: 'appliances',
      manual_url: '',
      other_data: {},
      manufacturer: ''
    }
  });
  await prisma.item.create({
    data: {
      property_id: req.params.id,
      xy_coordinates: { x: 100, y: 100 },
      //catalogue: {}
      condition_notes: '',
      catalogue_id: cata.id
    }
  });

  res.json({
    property: await prisma.property.findFirst({ where: { id: req.params.id } }),
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
  res.json(items);
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
  const catalogue = await prisma.catalogue.create({
    data: {
      id: randomUUID().toString(),
      serial_number: '47',
      name: req.body.name || '-',
      category: 'heater',
      manufacturer: req.body.manufacturer || '-',

      other_data: {},
      manual_url: 'https://manual'
    }
  });
  const item = await prisma.item.create({
    data: {
      id: randomUUID().toString(),
      catalogue_id: catalogue.id,
      property_id: property.id,
      xy_coordinates: { x: 100, y: 100 },
      condition_notes: ''
    }
  });
  res.json({ catalogue, item });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
