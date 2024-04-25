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

export { getHours, getMinutes, getSeconds, getMilliseconds };
