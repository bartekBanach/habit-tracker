import { Request, Response } from 'express';
import Habit, { IHabit } from '../models/habit';
import Timer, { ITimer } from '../models/timer';
import Goal, { IGoal } from '../models/goal';
import WorkSession, { IWorkSession } from '../models/workSession';
import asyncHandler from 'express-async-handler';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';
import DatabaseError from '../errors/DatabaseError';
import { startOfDay, endOfDay } from 'date-fns';

const getMyHabits = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.user?._id;
  const habits: IHabit[] = await Habit.find({ user: userId });
  if (!habits) throw new NotFoundError('No habits found for this user.');
  res.status(200).json(habits);
});

const getMyTimers = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.user?._id;
  const timers: ITimer[] = await Timer.find({ user: userId });
  if (!timers) throw new NotFoundError('Timers not found!');

  res.status(200).json(timers);
});

const getMyGoals = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.user?._id;
  const goals: IGoal[] = await Goal.find({ user: userId });
  if (!goals) throw new NotFoundError('Goals not found!');

  res.status(200).json(goals);
});

const getMyWorkSessions = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.user?._id;
  const { from, to, habitId } = req.query;

  if (!from || !to) {
    throw new BadRequestError('Request missing required parameteres.');
  }
  try {
    const query: any = {
      finishedAt: {
        $gte: startOfDay(new Date(from as string)),
        $lt: endOfDay(new Date(to as string)),
      },
      user: userId,
    };
    if (habitId) {
      query.habit = habitId;
    }
    const workSessions: IWorkSession[] = await WorkSession.find(query);
    res.json(workSessions);
  } catch (error) {
    throw new DatabaseError('Failed to get work sessions');
  }
});

export { getMyHabits, getMyTimers, getMyGoals, getMyWorkSessions };
