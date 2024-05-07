import mongoose, { Schema, Document, Model } from 'mongoose';
import { IWorkSession } from './workSession';

export interface IHabit extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  category: string;
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
    required: true,
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

// Define pre-remove hook to delete associated work sessions
habitSchema.pre<IHabit>('deleteOne', async function (next) {
  try {
    // Delete all work sessions associated with this habit
    await mongoose.model<IWorkSession>('WorkSession').deleteMany({ habit: this._id });
    next();
  } catch (error) {
    console.log(error);
    //next(error:);
  }
});

const habitModel: Model<IHabit> = mongoose.model<IHabit>('Habit', habitSchema);

export default habitModel;
