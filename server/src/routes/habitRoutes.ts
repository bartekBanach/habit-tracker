import express from 'express';
import cors from 'cors';
import { getAllHabits, getHabitsByUser, createHabit, updateHabit, deleteAllHabits } from '../controllers/habitController';
import { verifyJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  }),
);

router.post('/', verifyJWT, createHabit);
router.put('/:id', updateHabit);
router.get('/', verifyJWT, getAllHabits);
router.get('/user', verifyJWT, getHabitsByUser);
router.delete('/delete-all', deleteAllHabits);

export default router;
