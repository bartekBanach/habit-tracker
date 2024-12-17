import express from 'express';
import authRoutes from './routes/authRoutes';
import workSessionRoutes from './routes/workSessionRoutes';
import timerRoutes from './routes/timerRoutes';
import habitRoutes from './routes/habitRoutes';
import goalRoutes from './routes/goalRoutes';
import meRoutes from './routes/meRoutes';
import pingRoute from './routes/pingRoute';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler';

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log('Connected to db.'))
  .catch((err) => console.log('Error connecting to db.', err));

// Routes
app.use('/api/ping', pingRoute);
app.use('/api/auth', authRoutes);
app.use('/api/me', meRoutes);
app.use('/api/habits', habitRoutes);

app.use('/api/work-sessions', workSessionRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/timers', timerRoutes);

// Error handling middleware should be the last middleware
app.use(globalErrorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  return console.log(`Express server is listening at http://localhost:${port} 🚀`);
});
