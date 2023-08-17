import { useCallback, useState } from "react";
import "./App.css";
import Square from "./Square";
import Board from "./Board";
import Toggle from "./Toggle";
import { WINNING_LINES } from "./constants/WINNING_LINES";
import { BOARD_SIZE } from "./constants/BOARD_SIZE";
import { SQUARES_ARRAY } from "./constants/SQUARES_ARRAY";

type GameStatus = {
  isEnd: true;
  line: number[];
} | {
  isEnd: false;
}
function checkIsGameEnd(squares: string[]): GameStatus {
  for (const line of WINNING_LINES) {
    // line can be 3 to 9 length array
    const base = squares[line[0]];
    if (!base) continue;

    const isEnd = line.every((value) => {
      if (squares[value] === base) return true
      return false
    });
    if (!isEnd) continue;

    return { isEnd: true, line }
  }
  return { isEnd: false }
}

export default function Game() {
  const [history, setHistory] = useState(() => Array(1).fill([]));
  const currentMove = history.length - 1;
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const [ascending, setAscending] = useState(false);
  const [isGameEnd, setIsGameEnd] = useState(false);

  const handlePlay = useCallback((squares: Array<string>) => {
    const nextSquares = squares.slice(); // 인자를 수정하지 않기 위함

    const gameStatus = checkIsGameEnd(nextSquares);
    if (gameStatus.isEnd) {
      for (let index = 0; index < BOARD_SIZE; index++) {
        nextSquares[gameStatus.line[index]] = "◻︎";
      }
    }
    setIsGameEnd(gameStatus.isEnd);
    setHistory(prevHistory => [...prevHistory.slice(), nextSquares]);
  }, []);


  const jumpTo = useCallback((nextMove: number, squares: Array<string>) => {
    const nextSquares = squares.slice();

    const gameStatus = checkIsGameEnd(nextSquares);
    if (gameStatus.isEnd) {
      for (let index = 0; index < BOARD_SIZE; index++) {
        nextSquares[gameStatus.line[index]] = "◻︎";
      }
    }
    setIsGameEnd(gameStatus.isEnd);
    setHistory(prevHistory => [...prevHistory.slice(0, nextMove), nextSquares]);
  }, []);

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "You are at move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move} className="flex flex-col items-center">
        <button
          onClick={() => jumpTo(move, squares)}
          className="bg-slate-400 rounded mx-1 my-2 p-1"
        >
          {description}
        </button>
        <div className={`grid grid-cols-${BOARD_SIZE} w-[${BOARD_SIZE * 40}px]`}>
          {SQUARES_ARRAY.map((index) => (
            <Square key={index} value={squares[index]} />
          ))}
        </div>
      </li>
    );
  });

  return (
    <>
      <div className="flex flex-col items-center">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          moves={currentMove}
          isEnd={isGameEnd}
          squaresArray={SQUARES_ARRAY}
        />
        <br />
        <Toggle checked={ascending} setChecked={setAscending}></Toggle>
        <ol className={ascending ? "flex flex-col-reverse" : ""}>{moves}</ol>
      </div>
    </>
  );
}
