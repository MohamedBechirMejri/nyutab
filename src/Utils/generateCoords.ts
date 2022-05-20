const generateCoords = (width: number, height: number) => {
  const coords = [];
  for (let i = 1; i <= width * height; i += 1) {
    coords.push(i);
  }
  return coords;
};
export default generateCoords;
