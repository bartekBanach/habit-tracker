import { intervalToDuration } from 'date-fns';

function getHours(milliseconds: number) {
  const diffrenceInSeconds = Math.floor(milliseconds / 1000);
  return Math.floor(diffrenceInSeconds / 60 / 60);
}

function getMinutes(milliseconds: number) {
  const diffrenceInSeconds = Math.floor(milliseconds / 1000);
  return Math.floor(diffrenceInSeconds / 60) % 60;
}

function getSeconds(milliseconds: number) {
  const diffrenceInSeconds = Math.floor(milliseconds / 1000);
  return diffrenceInSeconds % 60;
}

function getMilliseconds(duration: Duration) {
  const { hours, minutes, seconds } = duration;
  return (
    (hours ?? 0) * 3600000 + (minutes ?? 0) * 60000 + (seconds ?? 0) * 1000
  );
}

const durationToMilliseconds = (duration: Duration): number => {
  return (
    (duration.hours ?? 0) * 60 * 60 * 1000 +
    (duration.minutes ?? 0) * 60 * 1000 +
    (duration.seconds ?? 0) * 1000
  );
};

const formatTime = (value: number) => {
  const duration = intervalToDuration({ start: 0, end: value });

  if (duration.hours && duration.minutes) {
    return `${duration.hours}h ${duration.minutes}min`;
  }
  if (duration.hours) {
    return `${duration.hours}h`;
  }
  if (duration.minutes) {
    return `${duration.minutes}min`;
  }

  return '';
};

const millisecondsToDurationStr = (milliseconds: number, format: string) => {
  let millisecondsLeft = milliseconds;

  let days = null;
  let hours = null;
  let minutes = null;
  let seconds = null;

  if (format.includes('d')) {
    days = Math.floor(millisecondsLeft / (1000 * 60 * 60 * 24));
    millisecondsLeft -= days * 1000 * 60 * 60 * 24;
  }
  if (format.includes('h')) {
    hours = Math.floor(millisecondsLeft / (1000 * 60 * 60));
    millisecondsLeft -= hours * 1000 * 60 * 60;
  }

  if (format.includes('m')) {
    minutes = Math.floor(millisecondsLeft / (1000 * 60));
    millisecondsLeft -= minutes * 1000 * 60;
  }
  if (format.includes('s')) {
    seconds = Math.floor(millisecondsLeft / 1000);
    millisecondsLeft -= seconds * 1000;
  }

  const formatted = format
    .replace('d', days !== null ? `${days}d` : '')
    .replace('h', hours !== null ? `${hours}h` : '')
    .replace('m', minutes !== null ? `${minutes}m` : '')
    .replace('s', seconds !== null ? `${seconds}s` : '');

  return formatted.trim() || '0s';
};

export {
  getHours,
  getMinutes,
  getSeconds,
  getMilliseconds,
  durationToMilliseconds,
  formatTime,
  millisecondsToDurationStr,
};
