import X2048 from "app/home/games/2048";
import Countries from "app/home/games/Countries";
import Minesweeper from "app/home/games/Minesweeper";
import ReflexChallenge from "app/home/games/ReflexChallenge";
import Sudoku from "app/home/games/Sudoku";
import Wordle from "app/home/games/Wordle";
import WordSearch from "app/home/games/WordSearch";

import { useOverlayStore } from "lib/stores";
import { useMemo } from "react";

const games = {
  2048: X2048,
  countries: Countries,
  minesweeper: Minesweeper,
  "reflex challenge": ReflexChallenge,
  sudoku: Sudoku,
  wordle: Wordle,
  wordsearch: WordSearch,
} as any;

export default function Games() {
  const { subOverlay } = useOverlayStore();

  const Game = useMemo(
    () => (subOverlay ? games[subOverlay] : null),
    [subOverlay]
  );

  return (
    <div className="relative h-screen">
      {Game ? <Game /> : <div>Game not found</div>}
    </div>
  );
}
