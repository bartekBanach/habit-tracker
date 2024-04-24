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
}

interface User {
  _id: string;
  username: string;
  email: string;
}
