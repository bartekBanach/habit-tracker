import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Timer, { ITimer } from '../models/timer';
import { durationToMilliseconds } from '../utils/timeUtils';
import NotFoundError from '../errors/NotFoundError';

export const createTimer = asyncHandler(async (req: Request, res: Response) => {
  const { habit, duration, user } = req.body;

  const newTimer: ITimer = new Timer({ habit, duration, remainingTime: durationToMilliseconds(duration), user });
  const savedTimer = await newTimer.save();
  res.status(201).json(savedTimer);
});

export const getTimersByUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;

  const timers = await Timer.find({ user: userId });
  res.status(200).json(timers);
});

export const updateTimer = asyncHandler(async (req: Request, res: Response) => {
  const timerId = req.params.id;
  const timer = await Timer.findById(timerId);
  if (!timer) {
    throw new NotFoundError('Timer not found');
  }

  const updates = req.body;
  Object.assign(timer, updates);
  await timer.save();

  res.status(200).json(timer);
});

export const deleteTimer = asyncHandler(async (req: Request, res: Response) => {
  const timerId = req.params.id;
  const timer = await Timer.findById(timerId);
  if (!timer) {
    throw new NotFoundError('Timer not found');
  }
  await Timer.findOneAndDelete({ _id: timerId });

  res.status(200).json({ message: 'Timer deleted' });
});
