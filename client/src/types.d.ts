interface Duration {
  hours: number;
  minutes: number;
  seconds: number;
}

interface Timer {
  id: string;
  habitId: string;
  title: string;
  duration: Duration;
  color: string;
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

interface WorkSession {
  _id?: string;
  habit: string;
  timeDuration: number;
  finishedAt: string;
  __v?: number;
}

interface Goal {
  timeLimit: TimeInterval;
  habit: string;
  timeAmount: number;
  requiredTimeAmount: number;
  status: string;
  type: string;
  _id?: string;
  __v?: number;
}

interface TimeInterval {
  startDate: string | Date;
  endDate: string | Date | null;
}

interface User {
  _id: string;
  username: string;
  email: string;
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
