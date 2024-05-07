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

interface Habit {
  _id?: string;
  name: string;
  category: string;
  user: string;
  timeSpent?: number;
  color: string;
}

interface WorkSession {
  _id?: string;
  habit: string;
  timeDuration: number;
  finishedAt: string;
  __v: number;
}

interface User {
  _id: string;
  username: string;
  email: string;
}
