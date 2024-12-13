interface Duration {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

interface Timer {
  _id: string;
  habit: string;
  user: string;
  duration: Duration;
  remainingTime: number;
}

interface NewTimer {
  habit: string;
  user: string;
  duration: Duration;
}

interface NewHabit {
  name: string;
  user: string;
  timeSpent?: number;
  color: string;
}

interface Habit extends NewHabit {
  _id: string;
}

interface NewWorkSession {
  habit: string;
  user: string;
  timeDuration: number;
}

interface WorkSession {
  _id?: string;
  habit: string;
  timeDuration: number;
  finishedAt: Date;
}

interface NewGoal {
  timeLimit: TimeInterval;
  habit: string;
  timeAmount: number;
  requiredTimeAmount: number;
  status: string;
  type: string;
}
interface Goal extends NewGoal {
  _id: string;
}
interface GoalWithHabit extends Goal {
  habitName: string;
  habitColor: string;
}

interface TimeInterval {
  startDate: string | Date;
  endDate: string | Date | null;
}

interface User {
  _id: string;
  username?: string;
  email: string;
  userPreferences?: UserPreferences;
}

interface UserPreferences {
  timersOrder?: string[];
}

interface UserInfo {
  _id: string;
  email: string;
  username: string;
  userPreferences?: UserPreferences;
}

interface DecodedToken {
  UserInfo: UserInfo;
}

interface BackendError {
  message: string;
  property?: string;
}

interface ErrorResponse {
  data: {
    errors: BackendError[];
  };
  status: number;
}
