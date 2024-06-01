import { Request, Response } from 'express';
import Habit, { IHabit } from '../models/habit';
import asyncHandler from 'express-async-handler';

const getAllHabits = async (req: Request, res: Response): Promise<void> => {
  try {
    const habits: IHabit[] = await Habit.find();
    res.json(habits);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Failed to get habits', error: error.message });
    }
  }
};

const getHabitsByUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.user?._id;
  const habits: IHabit[] = await Habit.find({ user: userId });
  res.json(habits);
});

const createHabit = async (req: Request, res: Response): Promise<void> => {
  const { name, category, user, color } = req.body;

  try {
    const habit: IHabit = new Habit({ name, category, user, color });
    await habit.save();
    res.status(201).json({ message: 'Habit created successfully', habit });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Failed to create habit', error: error.message });
    }
  }
};

const updateHabit = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, category, color } = req.body.habit;

  try {
    const habit: IHabit | null = await Habit.findById(id);

    if (!habit) {
      res.status(404).json({ message: 'Habit not found' });
      return;
    }
    console.log(req.body);

    habit.name = name || habit.name;
    habit.category = category || habit.category;
    habit.color = color || habit.color;

    await habit.save();
    res.json({ message: 'Habit updated successfully', habit });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Failed to update habit', error: error.message });
    }
  }
});

const deleteHabit = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const habit: IHabit | null = await Habit.findById(id);

    if (!habit) {
      res.status(404).json({ message: 'Habit not found' });
      return;
    }

    //await Habit.deleteOne({ _id: id });
    await Habit.findOneAndDelete({ _id: id });
    res.json({ message: 'Habit deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Failed to delete habit', error: error.message });
    }
  }
});

const deleteAllHabits = asyncHandler(async (req: Request, res: Response) => {
  try {
    // Delete all habits
    await Habit.deleteMany({});
    res.json({ message: 'All habits deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Failed to delete habits', error: error.message });
    }
  }
});
export { getAllHabits, getHabitsByUser, createHabit, updateHabit, deleteHabit, deleteAllHabits };
