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

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const calculateWinner = (squares: string[]) => {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        const calculatedSquares = squares.slice();
        calculatedSquares[a] = "☐";
        calculatedSquares[b] = "☐";
        calculatedSquares[c] = "☐";
        setIsEnd(true);
        return calculatedSquares;
      }
    }
    return squares;
  };

  const handlePlay = (nextSquares: Array<string>) => {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      calculateWinner(nextSquares),
    ];
    setHistory(nextHistory);
  };

  const jumpTo = (nextMove: number, nextSquares: Array<string>) => {
    setHistory([...history.slice(0, nextMove), nextSquares.slice()]);
    if (history.length - 1 != nextMove) {
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
          onClick={() => jumpTo(move, calculateWinner(squares))}
          className="bg-slate-400 rounded mx-1 my-2 p-1"
        >
          {description}
        </button>
        <div className="grid grid-cols-3 w-[120px]">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
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
        />
        <br />
        <Toggle checked={checked} setChecked={setChecked}></Toggle>
        <ol className={checked ? "flex flex-col-reverse" : ""}>{moves}</ol>
      </div>
    </>
  );
}
