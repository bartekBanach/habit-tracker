import { Request, Response } from 'express';
import WorkSession, { IWorkSession } from '../models/workSession';
import { startOfDay, endOfDay } from 'date-fns';
import asyncHandler from 'express-async-handler';
import DatabaseError from '../errors/DatabaseError';
import BadRequestError from '../errors/BadRequestError';

const createWorkSession = asyncHandler(async (req: Request, res: Response) => {
  const { habit, user, timeDuration } = req.body;
  if (!habit || !timeDuration || !user) {
    throw new BadRequestError('Missing required fields');
  }
  try {
    const workSession: IWorkSession = new WorkSession({ habit, timeDuration, user });
    await workSession.save();
    res.status(201).json({ message: 'Work Session created successfully', workSession });
  } catch (error) {
    throw new DatabaseError('Failed to create Work Session');
  }
});

const getAllWorkSessions = asyncHandler(async (req: Request, res: Response) => {
  try {
    const workSessions: IWorkSession[] = await WorkSession.find();
    res.json(workSessions);
  } catch (error) {
    throw new DatabaseError('Failed to get work sessions');
  }
});

const getWorkSessionsByTimePeriod = asyncHandler(async (req: Request, res: Response) => {
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

const deleteAllWorkSessions = asyncHandler(async (req: Request, res: Response) => {
  try {
    await WorkSession.deleteMany({});
    res.json({ message: 'All sessions deleted successfully' });
  } catch (error) {
    throw new DatabaseError('Failed to delete sessions');
  }
});

export { createWorkSession, getAllWorkSessions, getWorkSessionsByTimePeriod, deleteAllWorkSessions };
