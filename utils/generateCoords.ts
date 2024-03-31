const generateCoords = (xAxis: number, yAxis: number) => {
  const coords = [];
  for (let i = 1; i <= xAxis * yAxis; i += 1) {
    coords.push(i);
  }
  return coords;
};
export default generateCoords;
