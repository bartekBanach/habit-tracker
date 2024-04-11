import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHabit extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  category: string;
  color?: string;
}

const habitSchema: Schema<IHabit> = new Schema<IHabit>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
  },
  // activities: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
});

const habitModel: Model<IHabit> = mongoose.model<IHabit>("Habit", habitSchema);

export default habitModel;
