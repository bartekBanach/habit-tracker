import express from 'express';
import authRoutes from './routes/authRoutes';
import workSessionRoutes from './routes/workSessionRoutes';
import habitRoutes from './routes/habitRoutes';
import goalRoutes from './routes/goalRoutes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { notFound } from './middleware/errorMiddleware';
import { errorHandler } from './middleware/errorMiddleware';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  }),
);

//db connection
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log('Connected to db.'))
  .catch((err) => console.log('Error connecting to db.', err));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/work-sessions', workSessionRoutes);
app.use('/api/goals', goalRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;

app.listen(port, () => {
  return console.log(`Express server is listening at http://localhost:${port} 🚀`);
});
