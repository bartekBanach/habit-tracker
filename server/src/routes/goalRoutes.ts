import express from 'express';
import { createGoal, getGoals, updateGoal, deleteGoal, deleteAllGoals } from '../controllers/goalController';

const router = express.Router();

// Route to create a new goal
router.post('/', createGoal);

// Route to get all goals
router.get('/', getGoals);

// Route to update a goal
router.put('/:id', updateGoal);

// Route to delete a specific goal
router.delete('/:id', deleteGoal);

// Route to delete all goals
router.delete('/', deleteAllGoals);

export default router;
