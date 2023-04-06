export const functionRemover = (events: any[], target: any) => {
  for (let i = 0; i < events.length; i++) {
    if (events[i].name == target)
      return [...events.slice(0, i), ...events.slice(i + 1, events.length)];
  }
  return events;
};
