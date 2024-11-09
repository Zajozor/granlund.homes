import express, { Request, Response } from 'express';
import cors from 'cors'
import { randomUUID } from 'crypto';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors())
app.use(express.json());

app.get('/', (_: Request, res: Response) => {
  res.send('Hello, Hackathon!');
});

app.get('/zajotest', (_, res) => { res.json({ answer: 'yes' })})


app.post('/properties', async (req, res) => {
    const property = await prisma.property.create({
        data: {
            id: randomUUID().toString(),
            address: req.body.address,
        }
    });
    console.log('created property ' + property)

    res.json(property)
})

// List all properties
app.get('/properties', async (_, res) => {
    const properties = await prisma.property.findMany();
    res.json(properties)
})

app.post('/properties/:id/items', async (req, res) => {
    const property = await prisma.property.findFirst({
        where: {
            id: req.params.id
        }
    })
    if (property === null) {
        res.status(404)
        res.json({error: 'property not found'})
        return
    }
    const catalogue = await prisma.catalogue.create({
        data:{
        id: randomUUID().toString(),
        serial_number: '47',
        description: req.body.description || '-',
        manufacturer: req.body.manufacturer || '-',
        other: {},
        manual_url: 'https://manual'
        
        }
    })
    const item = await prisma.item.create({
        data: {
            id: randomUUID().toString(),
            catalogue_id: catalogue.id,

            // in pixels on the map i guess, why the heck is this a string field Calvin
            
        }
    })
    res.json({catalogue, item})
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
