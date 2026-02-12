import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import cardRoutes from './routes/cards';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('card', cardRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '698e2ab0096457196a1d21a4',
  };

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log('The server is up and running');
});
