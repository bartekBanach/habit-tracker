import { Request, Response } from 'express';
import WorkSession, { IWorkSession } from '../models/workSession';
import { startOfWeek, endOfWeek, startOfDay, endOfDay } from 'date-fns';
import asyncHandler from 'express-async-handler';

async function createWorkSession(req: Request, res: Response): Promise<void> {
  try {
    const { habit, timeDuration } = req.body;
    const workSession: IWorkSession = new WorkSession({ habit, timeDuration });
    await workSession.save();
    res.status(201).json({ message: 'Work Session created successfully', workSession });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: 'Failed to create Work Session',
        error: error.message,
      });
    }
  }
}

async function getAllWorkSessions(req: Request, res: Response): Promise<void> {
  try {
    const activities: IWorkSession[] = await WorkSession.find();
    res.json(activities);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Failed to get activities', error: error.message });
    }
  }
}

async function getWorkSessionsByTimePeriod(req: Request, res: Response): Promise<void> {
  try {
    const { from, to, habitId } = req.query;

    if (!from || !to) {
      res.status(400).json({ message: 'habitId, from and parameters are required' });
      return;
    }

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
    if (error instanceof Error) {
      res.status(500).json({ message: 'Failed to get work sessions', error: error.message });
    }
  }
}

const deleteAllWorkSessions = asyncHandler(async (req: Request, res: Response) => {
  try {
    await WorkSession.deleteMany({});
    res.json({ message: 'All sessions deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Failed to delete sessions', error: error.message });
    }
  }
});

export { createWorkSession, getAllWorkSessions, getWorkSessionsByTimePeriod, deleteAllWorkSessions };
