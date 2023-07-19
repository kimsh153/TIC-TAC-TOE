import { useState } from "react";
import "./App.css";

type SquareValue = {
  value: string;
  onSquareClick?: () => void;
};

function Square({ value, onSquareClick }: SquareValue) {
  return (
    <button
      className="w-10 h-10 bg-white inline-flex items-center justify-center text-2xl font-bold border"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

type BoardValue = {
  xIsNext: boolean;
  squares: Array<string>;
  onPlay: (value: Array<string>) => void;
  moves: number;
};

function Board({ xIsNext, squares, onPlay, moves }: BoardValue) {
  const handleClick = (i: number) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  };

  let status;
  if (moves < 9) {
    if (calculateWinner(squares)) {
      status = "Winner: " + (xIsNext ? "O" : "X");
    } else {
      status = "Next Player: " + (xIsNext ? "X" : "O");
    }
  } else {
    status = "Draw!!";
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="flex items-center">
        {[0, 1, 2].map((index, idx) => (
          <Square
            key={idx}
            value={squares[index]}
            onSquareClick={() => handleClick(index)}
          />
        ))}
      </div>
      <div className="flex items-center">
        {[3, 4, 5].map((index, idx) => (
          <Square
            key={idx}
            value={squares[index]}
            onSquareClick={() => handleClick(index)}
          />
        ))}
      </div>
      <div className="flex items-center">
        {[6, 7, 8].map((index, idx) => (
          <Square
            key={idx}
            value={squares[index]}
            onSquareClick={() => handleClick(index)}
          />
        ))}
      </div>
    </>
  );
}

function calculateWinner(squares: string[]) {
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      squares[a] = "☐";
      squares[b] = "☐";
      squares[c] = "☐";
      return true;
    }
  }
  return null;
}

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
        <br />
        <button onClick={() => jumpTo(move, squares)}>{description}</button>
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

type ToggleCheckedValue = {
  checked: boolean;
  setChecked: (checked: boolean) => void;
};

const Toggle = ({ checked, setChecked }: ToggleCheckedValue) => {
  const handleToggle = () => {
    setChecked(!checked);
  };

  return (
    <div className="flex items-center gap-1">
      <label
        htmlFor="toggle"
        className="relative inline-flex items-center cursor-pointer"
      >
        <input
          type="checkbox"
          id="toggle"
          className="sr-only peer"
          checked={checked}
          onChange={handleToggle}
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r from-gray-800 to-black"></div>
      </label>
      <p>정렬</p>
    </div>
  );
};
