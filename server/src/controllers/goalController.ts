import { Request, Response } from 'express';
import Goal, { IGoal } from '../models/goal';
import asyncHandler from 'express-async-handler';
import BadRequestError from '../errors/BadRequestError';

// Controller function to create a new goal
export const createGoal = asyncHandler(async (req: Request, res: Response) => {
  const { habit, timeAmount, requiredTimeAmount, status, timeLimit, type } = req.body;
  const userId = req?.user?._id;

  // Check if a goal for the given habit already exists for the user
  const existingGoal = await Goal.findOne({ habit, user: userId });
  if (existingGoal) {
    throw new BadRequestError('A goal for this habit already exists');
  }

  const newGoal: IGoal = new Goal({ habit, timeAmount, requiredTimeAmount, status, timeLimit, type, user: userId });
  await newGoal.save();
  res.status(201).json(newGoal);
});

// Controller function to get all goals
export const getGoals = async (req: Request, res: Response) => {
  try {
    const goals: IGoal[] = await Goal.find();
    res.json(goals);
  } catch (error) {
    console.error('Error fetching goals:', error);
    res.status(500).json({ message: 'Failed to fetch goals' });
  }
};

export const getGoalsByUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.user?._id;

  const goals: IGoal[] = await Goal.find({ user: userId });
  res.json(goals);
});

// Controller function to update a goal
export const updateGoal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { habit, timeAmount, requiredTimeAmount, status, timeLimit, type } = req.body;
    const updatedGoal: IGoal | null = await Goal.findByIdAndUpdate(
      id,
      { habit, timeAmount, requiredTimeAmount, status, timeLimit, type },
      { new: true },
    );
    if (updatedGoal) {
      res.json(updatedGoal);
    } else {
      res.status(404).json({ message: 'Goal not found' });
    }
  } catch (error) {
    console.error('Error updating goal:', error);
    res.status(500).json({ message: 'Failed to update goal' });
  }
};

// Controller function to delete a specific goal
export const deleteGoal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedGoal: IGoal | null = await Goal.findByIdAndDelete(id);
    if (deletedGoal) {
      res.json({ message: 'Goal deleted successfully' });
    } else {
      res.status(404).json({ message: 'Goal not found' });
    }
  } catch (error) {
    console.error('Error deleting goal:', error);
    res.status(500).json({ message: 'Failed to delete goal' });
  }
};

// Controller function to delete all goals
export const deleteAllGoals = async (req: Request, res: Response) => {
  try {
    await Goal.deleteMany();
    res.json({ message: 'All goals deleted successfully' });
  } catch (error) {
    console.error('Error deleting all goals:', error);
    res.status(500).json({ message: 'Failed to delete all goals' });
  }
};
