import { Duration } from 'date-fns';

// Helper function to convert duration to milliseconds
const durationToMilliseconds = (duration: Duration): number => {
  return (duration.hours || 0) * 60 * 60 * 1000 + (duration.minutes || 0) * 60 * 1000 + (duration.seconds || 0) * 1000;
};

export { durationToMilliseconds };
