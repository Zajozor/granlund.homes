import { Property } from 'db/models';

import express, { Request, Response } from 'express';
import cors from 'cors'
import { UUIDV4 } from 'sequelize';

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors())
app.use(express.json());

app.get('/', (_: Request, res: Response) => {
  res.send('Hello, Hackathon!');
});

app.get('/zajotest', (_, res) => { res.json({ answer: 'yes' })})


app.post('/properties', async (req, res) => {
    const property = await Property.create({
      uid: UUIDV4(),
      address: req.body.address,
    });
    console.log('created property ' + property)

    res.json(property)
})

// List all properties
app.get('/properties', async (_, res) => {
    const properties = await Property.findAll();
    res.json(properties)
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
