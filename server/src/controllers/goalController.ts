import { Request, Response } from 'express';
import Goal, { IGoal } from '../models/goal';
import asyncHandler from 'express-async-handler';
import BadRequestError from '../errors/BadRequestError';
import NotFoundError from '../errors/NotFoundError';
import DatabaseError from '../errors/DatabaseError';

export const createGoal = asyncHandler(async (req: Request, res: Response) => {
  const { habit, timeAmount, requiredTimeAmount, status, timeLimit, type } = req.body;
  const userId = req?.user?._id;

  const existingGoal = await Goal.findOne({ habit, user: userId });
  if (existingGoal) {
    throw new BadRequestError('A goal for this habit already exists');
  }

  const newGoal: IGoal = new Goal({ habit, timeAmount, requiredTimeAmount, status, timeLimit, type, user: userId });
  await newGoal.save();
  res.status(201).json(newGoal);
});

export const getGoals = asyncHandler(async (req: Request, res: Response) => {
  const goals: IGoal[] = await Goal.find();
  if (!goals) throw new NotFoundError('Goals not found!');
  res.json(goals);
});

export const getGoalsByUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.user?._id;
  const goals: IGoal[] = await Goal.find({ user: userId });
  if (!goals) throw new NotFoundError('Goals not found!');

  res.json(goals);
});

export const updateGoal = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { habit, timeAmount, requiredTimeAmount, status, timeLimit, type } = req.body;

  if (!id) {
    throw new BadRequestError('ID parameter is missing');
  }
  if (!habit || timeAmount === undefined || requiredTimeAmount === undefined || !status || !timeLimit || !type) {
    throw new BadRequestError('One or more required parameters are missing');
  }

  const updatedGoal: IGoal | null = await Goal.findByIdAndUpdate(
    id,
    { habit, timeAmount, requiredTimeAmount, status, timeLimit, type },
    { new: true },
  );
  if (updatedGoal) {
    res.json(updatedGoal);
  } else {
    throw new DatabaseError('Failed to update goal item in the database');
  }
});

export const deleteGoal = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError('ID parameter is missing');
  }
  const deletedGoal: IGoal | null = await Goal.findByIdAndDelete(id);
  if (deletedGoal) {
    res.json({ message: 'Goal deleted successfully' });
  } else {
    throw new DatabaseError('Failed to delete goal item');
  }
});

export const deleteAllGoals = asyncHandler(async (req: Request, res: Response) => {
  await Goal.deleteMany();
});
