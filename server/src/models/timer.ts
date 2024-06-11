import mongoose, { Document, Model, Schema } from 'mongoose';

interface Duration {
  hours: number;
  minutes: number;
  seconds: number;
}

interface ITimer extends Document {
  habit: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  duration: Duration;
  remainingTime: number;
}

const timerSchema: Schema<ITimer> = new mongoose.Schema({
  habit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  duration: {
    hours: {
      type: Number,
      required: true,
    },
    minutes: {
      type: Number,
      required: true,
    },
    seconds: {
      type: Number,
      required: true,
    },
  },
  remainingTime: {
    type: Number,
    required: true,
  },
});

const TimerModel: Model<ITimer> = mongoose.model('Timer', timerSchema);

export { ITimer };
export default TimerModel;
