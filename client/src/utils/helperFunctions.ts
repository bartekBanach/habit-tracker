const getSortedTimers = (
  timers: Timer[],
  timersOrder: string[] | null | undefined
): Timer[] => {
  if (!timersOrder) return timers;

  const orderedTimers = timersOrder
    .map((id) => timers.find((timer) => timer._id === id))
    .filter((timer): timer is Timer => Boolean(timer));

  const unorderedTimers = timers.filter(
    (timer) => !timersOrder.includes(timer._id)
  );

  return [...orderedTimers, ...unorderedTimers];
};

export { getSortedTimers };
