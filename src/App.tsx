import { useState } from "react";
import "./App.css";
import Square from "./Square";
import Board from "./Board";
import Toggle from "./Toggle";

export default function Game() {
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const [history, setHistory] = useState(Array(9).fill([]));
  const currentSquares = history[currentMove];
  const [checked, setChecked] = useState(false);

  const handlePlay = (nextSquares: Array<string>) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove: number, nextSquares: Array<string>) => {
    setHistory([...history.slice(0, nextMove), nextSquares]);
    setCurrentMove(nextMove);
  };

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "You are at move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move, squares)}
          className="bg-slate-400 rounded mx-1 my-2 p-1"
        >
          {description}
        </button>
        <div className="flex items-center">
          {[0, 1, 2].map((index, idx) => (
            <Square key={idx} value={squares[index]} />
          ))}
        </div>
        <div className="flex items-center">
          {[3, 4, 5].map((index, idx) => (
            <Square key={idx} value={squares[index]} />
          ))}
        </div>
        <div className="flex items-center">
          {[6, 7, 8].map((index, idx) => (
            <Square key={idx} value={squares[index]} />
          ))}
        </div>
      </li>
    );
  });

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            moves={currentMove}
          />
        </div>
        <br />
        <div className="game-info">
          <Toggle checked={checked} setChecked={setChecked}></Toggle>
          <ol>{checked ? moves.reverse() : moves}</ol>
        </div>
      </div>
    </>
  );
}
