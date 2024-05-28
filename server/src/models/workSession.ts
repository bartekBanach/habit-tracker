import mongoose, { Model, Schema, Document } from 'mongoose';
import { IHabit } from './habit';
import { IGoal } from './goal';
import { GoalStatus } from './goal';

export interface IWorkSession extends Document {
  habit: mongoose.Types.ObjectId;
  timeDuration: Number;
  finishedAt: Date;
}

const workSessionSchema = new Schema({
  habit: {
    type: Schema.Types.ObjectId,
    ref: 'Habit',
    required: true,
  },
  timeDuration: {
    type: Number,
    required: true,
  },
  finishedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

workSessionSchema.pre('save', async function (next) {
  try {
    const habit = await mongoose.model<IHabit>('Habit').findById(this.habit);
    if (habit) {
      habit.timeSpent += this.timeDuration;
      await habit.save();
    }
    const goal = await mongoose.model<IGoal>('Goal').findOne({ habit: this.habit });
    if (goal && goal.status !== GoalStatus.FAILED) {
      goal.timeAmount += this.timeDuration;
      if (goal.timeAmount >= goal.requiredTimeAmount) {
        goal.status = GoalStatus.FULFILLED;
      }
      await goal.save();
    }

    next();
  } catch (error: any) {
    next(error);
  }
});

const workSessionModel: Model<IWorkSession> = mongoose.model<IWorkSession>('WorkSession', workSessionSchema);

export default workSessionModel;
