import { Request, Response } from "express";
import WorkSession, { IWorkSession } from "../models/workSession";
import { startOfWeek, endOfWeek } from "date-fns";

async function createWorkSession(req: Request, res: Response): Promise<void> {
  try {
    const { habit, timeDuration } = req.body;
    const workSession: IWorkSession = new WorkSession({ habit, timeDuration });
    await workSession.save();
    res
      .status(201)
      .json({ message: "Work Session created successfully", workSession });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Failed to create Work Session",
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
      res
        .status(500)
        .json({ message: "Failed to get activities", error: error.message });
    }
  }
}

async function getWorkSessionsByTimePeriod(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { from, to, habitId } = req.query;

    if (!habitId || !from || !to) {
      res
        .status(400)
        .json({ message: "habitId, from and parameters are required" });
      return;
    }
    const workSessions: IWorkSession[] = await WorkSession.find({
      habit: habitId as string,
      finishedAt: {
        $gte: new Date(from as string),
        $lte: new Date(to as string),
      },
    });

    res.json(workSessions);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Failed to get work sessions", error: error.message });
    }
  }
}

export { createWorkSession, getAllWorkSessions, getWorkSessionsByTimePeriod };
