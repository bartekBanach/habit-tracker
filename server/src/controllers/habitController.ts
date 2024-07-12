import { Request, Response } from 'express';
import Habit, { IHabit } from '../models/habit';
import asyncHandler from 'express-async-handler';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';
import DatabaseError from '../errors/DatabaseError';

const getAllHabits = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const habits: IHabit[] = await Habit.find();
  if (!habits) throw new NotFoundError('No habits found');
  res.json(habits);
});

const getHabitsByUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;

  const habits: IHabit[] = await Habit.find({ user: userId });
  if (!habits) throw new NotFoundError('No habits found for this user.');
  res.json(habits);
});

const createHabit = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { name, user, color } = req.body;
  if (!name || !user || !color) {
    throw new BadRequestError('Missing required fields');
  }
  try {
    const habit: IHabit = new Habit({ name, user, color });
    await habit.save();
    res.status(201).json({ message: 'Habit created successfully', habit });
  } catch (error) {
    throw new DatabaseError('Failed to create new habit.');
  }
});

const updateHabit = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, color } = req.body.habit;

  if (!id) {
    throw new BadRequestError('ID parameter is missing');
  }

  const habit: IHabit | null = await Habit.findById(id);

  if (!habit) {
    throw new NotFoundError('Habit not found');
  }

  habit.name = name || habit.name;
  habit.color = color || habit.color;
  try {
    await habit.save();
    res.json({ message: 'Habit updated successfully', habit });
  } catch (error) {
    throw new DatabaseError('Failed to update habit.');
  }
});

const deleteHabit = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new BadRequestError('ID parameter is missing');
  }

  const habit: IHabit | null = await Habit.findById(id);

  if (!habit) {
    throw new NotFoundError('Habit not found.');
  }

  try {
    await Habit.findOneAndDelete({ _id: id });
    res.json({ message: 'Habit deleted successfully' });
  } catch (error) {
    throw new DatabaseError('Failed to delete habit');
  }
});

const deleteAllHabits = asyncHandler(async (req: Request, res: Response) => {
  try {
    await Habit.deleteMany({});
    res.json({ message: 'All habits deleted successfully' });
  } catch (error) {
    throw new DatabaseError('Failed to delete habits');
  }
});
export { getAllHabits, getHabitsByUser, createHabit, updateHabit, deleteHabit, deleteAllHabits };
