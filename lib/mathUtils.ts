export const getRandomNumber = (lessThan: number, min = 0) => {
  return Math.floor(Math.random() * lessThan + min)
}
