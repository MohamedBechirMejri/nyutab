const generateRandomCoord = (min: number, max: number, avoid: number[]): number => {
  let coord = Math.floor(Math.random() * (max * min))
  if (avoid.includes(coord) || coord === 0 || coord > max * min) {
    coord = generateRandomCoord(min, max, avoid)
  }
  return coord
}
export default generateRandomCoord
