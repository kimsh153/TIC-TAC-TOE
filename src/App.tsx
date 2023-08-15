import { useState } from "react";
import "./App.css";
import Square from "./Square";
import Board from "./Board";
import Toggle from "./Toggle";

export default function Game() {
  const [history, setHistory] = useState(Array(1).fill([]));
  const currentMove = history.length - 1;
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [checked, setChecked] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const squaresArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const boardSize = 3;
  const lines: number[][] = [];

  for (let i = 0; i < boardSize; i++) {
    lines.push(Array.from({ length: boardSize }, (_, j) => i * boardSize + j));
    lines.push(Array.from({ length: boardSize }, (_, j) => j * boardSize + i));
  }

  lines.push(Array.from({ length: boardSize }, (_, i) => i * boardSize + i));
  lines.push(
    Array.from(
      { length: boardSize },
      (_, i) => i * boardSize + (boardSize - 1 - i)
    )
  );

  const getIsGameEnd = (squares: string[]) => {
    for (const line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return true;
      }
    }
    return false;
  };

  const handlePlay = (nextSquares: Array<string>) => {
    let nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    if (getIsGameEnd(nextSquares)) {
      for (const line of lines) {
        const [a, b, c] = line;
        if (
          nextSquares[a] &&
          nextSquares[a] === nextSquares[b] &&
          nextSquares[a] === nextSquares[c]
        ) {
          nextSquares[a] = "◻︎";
          nextSquares[b] = "◻︎";
          nextSquares[c] = "◻︎";
        }
      }
      setIsEnd(true);
      nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    }
    setHistory(nextHistory);
  };

  const jumpTo = (nextMove: number, nextSquares: Array<string>) => {
    setHistory([...history.slice(0, nextMove), nextSquares.slice()]);
    if (history.length - 1 !== nextMove) {
      setIsEnd(false);
    }
  };

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
        <div className="grid grid-cols-3 w-[120px]">
          {squaresArray.map((index) => (
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
          isEnd={isEnd}
          squaresArray={squaresArray}
        />
        <br />
        <Toggle checked={checked} setChecked={setChecked}></Toggle>
        <ol className={checked ? "flex flex-col-reverse" : ""}>{moves}</ol>
      </div>
    </>
  );
}
