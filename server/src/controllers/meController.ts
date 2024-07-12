import { Request, Response } from 'express';
import Habit, { IHabit } from '../models/habit';
import asyncHandler from 'express-async-handler';
import NotFoundError from '../errors/NotFoundError';

const getMyHabits = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.user?._id;

  const habits: IHabit[] = await Habit.find({ user: userId });
  if (!habits) throw new NotFoundError('No habits found for this user.');
  res.json(habits);
});

export { getMyHabits };
