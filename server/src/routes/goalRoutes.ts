import express from 'express';
import { createGoal, getGoals, getGoalsByUser, updateGoal, deleteGoal, deleteAllGoals } from '../controllers/goalController';
import { verifyJWT } from '../middleware/authMiddleware';

const router = express.Router();

// Route to create a new goal
router.post('/', verifyJWT, createGoal);

// Route to get goals
router.get('/', getGoals);

// Route to get user's goals
router.get('/user', verifyJWT, getGoalsByUser);

// Route to update a goal
router.put('/:id', updateGoal);

// Route to delete a specific goal
router.delete('/:id', verifyJWT, deleteGoal);

// Route to delete all goals
router.delete('/', deleteAllGoals);

export default router;
