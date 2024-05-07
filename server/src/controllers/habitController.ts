import { Request, Response } from 'express';
import Habit, { IHabit } from '../models/habit';
import asyncHandler from 'express-async-handler';

const getAllHabits = async (req: Request, res: Response): Promise<void> => {
  try {
    const habits: IHabit[] = await Habit.find();
    res.json(habits);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Failed to get habits', error: error.message });
    }
  }
};

const getHabitsByUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.user?._id;
  const habits: IHabit[] = await Habit.find({ user: userId });
  res.json(habits);
});

const createHabit = async (req: Request, res: Response): Promise<void> => {
  const { name, category, user, color } = req.body;

  try {
    const habit: IHabit = new Habit({ name, category, user, color });
    await habit.save();
    res.status(201).json({ message: 'Habit created successfully', habit });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Failed to create habit', error: error.message });
    }
  }
};

const deleteAllHabits = asyncHandler(async (req: Request, res: Response) => {
  try {
    // Delete all habits
    await Habit.deleteMany({});
    res.json({ message: 'All habits deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Failed to delete habits', error: error.message });
    }
  }
});
export { getAllHabits, getHabitsByUser, createHabit, deleteAllHabits };
