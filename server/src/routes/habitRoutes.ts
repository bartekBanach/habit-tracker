import express from 'express';
import { getAllHabits, getHabitsByUser, createHabit, updateHabit, deleteHabit, deleteAllHabits } from '../controllers/habitController';
import { verifyJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', verifyJWT, createHabit);
router.put('/:id', verifyJWT, updateHabit);
router.get('/', verifyJWT, getAllHabits);
router.get('/user/:id', verifyJWT, getHabitsByUser);
router.delete('/:id', verifyJWT, deleteHabit);
router.delete('/delete-all', deleteAllHabits);

export default router;
