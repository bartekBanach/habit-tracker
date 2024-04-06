

  interface Duration {
    hours: number;
    minutes: number;
    seconds: number;
  }

  interface Timer {
    id: string;
    title: string;
    duration: Duration;
  }