import Square from "./Square";

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
  if (calculateWinner(squares)) {
    status = "Winner: " + (xIsNext ? "O" : "X");
  } else if (moves > 9) {
    status = "Draw!!";
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
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

export default Board;
