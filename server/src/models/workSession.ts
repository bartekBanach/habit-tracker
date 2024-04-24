import mongoose, { Model, Schema, Document } from "mongoose";

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

const workSessionModel: Model<IWorkSession> = mongoose.model<IWorkSession>(
  "Activity",
  workSessionSchema,
);

export default workSessionModel;
