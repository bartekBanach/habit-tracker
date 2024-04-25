import mongoose, { Model, Schema, Document } from "mongoose";
import { IHabit } from "./habit";

export interface IWorkSession extends Document {
  habit: mongoose.Types.ObjectId;
  timeDuration: Number;
  finishedAt: Date;
}

const workSessionSchema = new Schema({
  habit: {
    type: Schema.Types.ObjectId,
    ref: "Habit",
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

workSessionSchema.pre("save", async function (next) {
  try {
    const habit = await mongoose.model<IHabit>("Habit").findById(this.habit);
    if (habit) {
      console.log(habit);
      habit.timeSpent += this.timeDuration;
      await habit.save();
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

const workSessionModel: Model<IWorkSession> = mongoose.model<IWorkSession>(
  "WorkSession",
  workSessionSchema,
);

export default workSessionModel;
