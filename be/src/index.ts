import express, { Request, Response } from 'express';
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors())
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Hackathon!');
});

app.get('/zajotest', (_, res) => { res.json({ answer: 'yes' })})

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
