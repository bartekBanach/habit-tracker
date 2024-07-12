import express from 'express';
import cors from 'cors';
import { getAllHabits, getHabitsByUser, createHabit, updateHabit, deleteHabit, deleteAllHabits } from '../controllers/habitController';
import { verifyJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  }),
);

router.post('/', verifyJWT, createHabit);
router.put('/:id', verifyJWT, updateHabit);
router.get('/', verifyJWT, getAllHabits);
router.get('/user/:id', verifyJWT, getHabitsByUser);
router.delete('/:id', verifyJWT, deleteHabit);
router.delete('/delete-all', deleteAllHabits);

export default router;
