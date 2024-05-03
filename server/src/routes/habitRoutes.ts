import express from 'express';
import cors from 'cors';
import { getAllHabits, getHabitsByUser, createHabit } from '../controllers/habitController';
import { verifyJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  }),
);

router.post('/', verifyJWT, createHabit);
router.get('/', verifyJWT, getAllHabits);
router.get('/user', verifyJWT, getHabitsByUser);

export default router;
