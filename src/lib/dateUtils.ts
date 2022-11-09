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

export const getTodaysDate = (date?: any) => {
  return date ? new Date(date) : new Date();
};
export const getTomorrowsDate = () => {
  const today = new Date();
  // to return the date number(1-31) for the specified date
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  //returns the tomorrow date
  return tomorrow;
};
