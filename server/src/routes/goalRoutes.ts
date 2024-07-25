import express from 'express';
import { createGoal, getGoals, getGoalsByUser, updateGoal, deleteGoal, deleteAllGoals } from '../controllers/goalController';
import { verifyJWT } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', verifyJWT, createGoal);
router.get('/', getGoals);
router.get('/user', verifyJWT, getGoalsByUser);
router.put('/:id', updateGoal);
router.delete('/:id', verifyJWT, deleteGoal);
router.delete('/', deleteAllGoals);

export default router;
