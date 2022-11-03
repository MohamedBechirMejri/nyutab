export const getDate = () => {
  return new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
export const getTime = () => {
  return new Date().toLocaleTimeString();
};
