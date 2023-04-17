import ReactLoading from "react-loading";

export const functionRemover = (events: Function[], targetName: string) => {
  if (events === undefined) return [];
  for (let i = 0; i < events.length; i++) {
    if (events[i].name === targetName)
      return [...events.slice(0, i), ...events.slice(i + 1, events.length)];
  }
  return events;
};

export const functionChecker = (events: Function[], targetName: string) => {
  if (events === undefined) return false;
  for (let i = 0; i < events.length; i++) {
    if (events[i].name === targetName) return true;
  }
  return false;
};

export const Loading = () => {
  return (
    <ReactLoading
      type={"spin"}
      color={"black"}
      height={"100%"}
      width={"100%"}
    />
  );
};
