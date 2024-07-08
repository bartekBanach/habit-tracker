import mongoose, { Schema, Document, Model } from 'mongoose';
import { IWorkSession } from './workSession';
import { IGoal } from './goal';
import WorkSession from './workSession';
import Goal from './goal';

import Timer from './timer';

export interface IHabit extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  category?: string;
  color?: string;
  timeSpent: number;
}

const habitSchema: Schema<IHabit> = new Schema<IHabit>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  color: {
    type: String,
    required: true,
  },
  timeSpent: {
    type: Number,
    default: 0,
  },
});

habitSchema.post<IHabit>('findOneAndDelete', async function (doc: IHabit) {
  try {
    // Delete all work sessions and goals associated with this habit
    await WorkSession.deleteMany({ habit: doc._id });
    await Goal.deleteMany({ habit: doc._id });
    await Timer.deleteMany({ habit: doc._id });
  } catch (error) {
    console.log(error);
  }
});

const habitModel: Model<IHabit> = mongoose.model<IHabit>('Habit', habitSchema);

export default habitModel;
