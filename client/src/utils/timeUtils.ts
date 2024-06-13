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
  return hours * 3600000 + minutes * 60000 + seconds * 1000;
}

// Helper function to convert duration to milliseconds
const durationToMilliseconds = (duration: Duration): number => {
  return (
    (duration.hours || 0) * 60 * 60 * 1000 +
    (duration.minutes || 0) * 60 * 1000 +
    (duration.seconds || 0) * 1000
  );
};

export {
  getHours,
  getMinutes,
  getSeconds,
  getMilliseconds,
  durationToMilliseconds,
};
