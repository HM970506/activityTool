export const functionRemover = (events: any[], target: any) => {
  if (events == undefined) return [];
  for (let i = 0; i < events.length; i++) {
    if (events[i].name == target)
      return [...events.slice(0, i), ...events.slice(i + 1, events.length)];
  }
  return events;
};

export const functionChecker = (events: any[], target: any) => {
  if (events == undefined) return false;
  for (let i = 0; i < events.length; i++) {
    if (events[i].name == target) return true;
  }
  return false;
};
