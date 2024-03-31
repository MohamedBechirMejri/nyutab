export const getRandomNumber = (lessThan: number, min: number = 0) => {
  return Math.floor(Math.random() * lessThan + min);
};
