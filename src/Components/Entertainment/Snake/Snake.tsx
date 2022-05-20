import React from "react";
import generateCoords from "../../../Utils/generateCoords";

const Snake = () => {
  const width = 10;
  const height = 10;
  const [board, setBoard] = React.useState(generateCoords(width, height));
  return <div></div>;
};

export default Snake;
