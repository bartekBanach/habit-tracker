import { Request, Response } from "express";
import WorkSession, { IWorkSession } from "../models/workSession";

export async function createWorkSession(
  req: Request,
  res: Response,
): Promise<void> {
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

export async function getAllWorkSessions(
  req: Request,
  res: Response,
): Promise<void> {
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
