import mongoose from 'mongoose';
import Goal, { GoalStatus, GoalType } from '../models/goal';
import dotenv from 'dotenv';

dotenv.config();
mongoose.connect(process.env.MONGO_URL as string);

const checkGoals = async () => {
  try {
    const currentDate = new Date();
    //Update one time goals
    await Goal.updateMany(
      {
        type: GoalType.ONE_TIME,
        status: GoalStatus.IN_PROGRESS,
        $expr: {
          $and: [
            { $gte: ['$timeAmount', '$requiredTimeAmount'] },
            { $lt: ['$timeLimit.endDate', currentDate] },
            { $ne: ['$timeLimit.endDate', null] },
          ],
        },
      },
      { $set: { status: GoalStatus.FULFILLED } },
    );

    await Goal.updateMany(
      {
        type: GoalType.ONE_TIME,
        status: GoalStatus.IN_PROGRESS,
        $expr: {
          $and: [
            { $lt: ['$timeAmount', '$requiredTimeAmount'] },
            { $gte: [currentDate, '$timeLimit.endDate'] },
            { $ne: ['$timeLimit.endDate', null] },
          ],
        },
      },
      { $set: { status: GoalStatus.FAILED } },
    );

    // Update daily goals
    await Goal.updateMany({ type: GoalType.DAILY }, { $set: { timeAmount: 0, status: GoalStatus.IN_PROGRESS } });

    console.log('Goals checked and updated successfully');
  } catch (error) {
    console.error('Error checking goals:', error);
  } finally {
    await mongoose.disconnect();
  }
};

checkGoals().catch(console.error);
