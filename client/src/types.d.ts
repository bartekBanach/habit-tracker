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
}

interface Habit {
  _id?: string;
  name: string;
  category: string;
  user: string;
  timeSpent: number;
}

interface WorkSession {
  _id?: string;
  habit: string;
  timeDuration: number;
  finishedAt: Date;
}

interface User {
  _id: string;
  username: string;
  email: string;
}
