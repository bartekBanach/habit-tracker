import { Request, Response } from "express";
import Activity, { IActivity } from "../models/activity";

export async function createActivity(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { habit, timeDuration } = req.body;
    const activity: IActivity = new Activity({ habit, timeDuration });
    await activity.save();
    res
      .status(201)
      .json({ message: "Activity created successfully", activity });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Failed to create activity", error: error.message });
    }
  }
}

export async function getAllActivities(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const activities: IActivity[] = await Activity.find();
    res.json(activities);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Failed to get activities", error: error.message });
    }
  }
}
