import { Request, Response } from "express";
import Habit, { IHabit } from "../models/habit";

export const getAllHabits = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const habits: IHabit[] = await Habit.find();
    res.json(habits);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Failed to get habits", error: error.message });
    }
  }
};

export const createHabit = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { name, category, user } = req.body;

  try {
    const habit: IHabit = new Habit({ name, category, user });
    await habit.save();
    res.status(201).json({ message: "Habit created successfully", habit });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Failed to create habit", error: error.message });
    }
  }
};
