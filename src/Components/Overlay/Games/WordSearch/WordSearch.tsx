import axios from "axios";
import React, { useState } from "react";

const WordSearch = () => {
  const [width, setWidth] = useState(9);
  const [height, setHeight] = useState(9);
  const [wordsCount, setWordsCount] = useState(10);
  const [grid, setGrid] = useState([
    ["e", "n", "r", "w", "r", "o", "l", "o", "c"],
    ["t", "o", "o", "o", "a", "l", "n", "b", "p"],
    ["e", "o", "o", "l", "z", "a", "w", "r", "a"],
    ["l", "n", "s", "p", "r", "e", "o", "u", "n"],
    ["h", "r", "t", "w", "e", "m", "t", "g", "t"],
    ["t", "e", "e", "o", "l", "t", "n", "b", "s"],
    ["a", "t", "r", "n", "l", "a", "w", "y", "t"],
    ["v", "f", "s", "s", "e", "o", "o", "f", "j"],
    ["i", "a", "b", "d", "t", "z", "d", "s", "n"],
  ]);
  const [words, setWords] = useState([
    { word: "color", position: { start: [9, 1], end: [5, 1] } },
    { word: "downtown", position: { start: [7, 9], end: [7, 2] } },
    { word: "teller", position: { start: [5, 9], end: [5, 4] } },
    { word: "pants", position: { start: [9, 2], end: [9, 6] } },
    { word: "athlete", position: { start: [1, 7], end: [1, 1] } },
    { word: "afternoon", position: { start: [2, 9], end: [2, 1] } },
    { word: "snowplow", position: { start: [4, 8], end: [4, 1] } },
    { word: "rooster", position: { start: [3, 1], end: [3, 7] } },
    { word: "rugby", position: { start: [8, 3], end: [8, 7] } },
    { word: "oatmeal", position: { start: [6, 8], end: [6, 2] } },
  ]);

  const handleNewGame = async () => {
    const res = await axios.get("https://shadify.dev/api/wordsearch/generator");
    setGrid(res.data.grid);
    setWords(res.data.words);
    setWidth(res.data.width);
    setHeight(res.data.height);
    setWordsCount(res.data.wordsCount);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div>
        {grid.map((row, y) => {
          return (
            <div className="flex">
              {row.map((col, x) => {
                return (
                  <button className="w-24 h-24 border border-black">
                    {col}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WordSearch;
