import mongoose, { Model, Schema, Document } from "mongoose";

export interface IActivity extends Document {
  habit: mongoose.Types.ObjectId;
  timeDuration: Number;
  finishedAt: Date;
}

const activitySchema = new Schema({
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

const activityModel: Model<IActivity> = mongoose.model<IActivity>(
  "Activity",
  activitySchema,
);

export default activityModel;
