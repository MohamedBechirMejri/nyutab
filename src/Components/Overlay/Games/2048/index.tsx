import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const X2048 = () => {
  const [gameBoard, setGameBoard] = useState(board);

  return <div className=""></div>;
};
export default X2048;
