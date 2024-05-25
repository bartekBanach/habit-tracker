import mongoose, { Schema, Document } from 'mongoose';

// Enum for goal types
enum GoalType {
  ONE_TIME = 'one_time',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  ANNUAL = 'annual',
}

// Enum for goal statuses
enum GoalStatus {
  FULFILLED = 'fulfilled',
  FAILED = 'failed',
  IN_PROGRESS = 'in_progress',
}

export interface IGoal extends Document {
  habit: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  timeAmount: number;
  requiredTimeAmount: number;
  status: GoalStatus;
  timeLimit: {
    startDate: Date;
    endDate?: Date;
  };
  type: GoalType;
}

const goalSchema: Schema = new Schema({
  habit: { type: Schema.Types.ObjectId, ref: 'Habit', required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  timeAmount: { type: Number, default: 0 },
  requiredTimeAmount: { type: Number, required: true },
  status: { type: String, enum: Object.values(GoalStatus), default: GoalStatus.IN_PROGRESS },
  timeLimit: {
    startDate: { type: Date, required: true },
    endDate: { type: Date },
  },
  type: { type: String, enum: Object.values(GoalType), required: true },
});

const Goal = mongoose.model<IGoal>('Goal', goalSchema);
export default Goal;
