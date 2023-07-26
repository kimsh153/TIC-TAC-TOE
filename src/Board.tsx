import Square from "./Square";

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

function calculateWinner(squares: string[]) {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      const calculateSquares = squares.slice();
      calculateSquares[a] = "☐";
      calculateSquares[b] = "☐";
      calculateSquares[c] = "☐";
      return calculateSquares;
    }
  }
  return squares;
}

type BoardValue = {
  xIsNext: boolean;
  squares: Array<string>;
  onPlay: (value: Array<string>) => void;
  moves: number;
};

function Board({ xIsNext, squares, onPlay, moves }: BoardValue) {
  const handleClick = (i: number) => {
    if (squares[i] || calculateWinner(squares) != squares) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(calculateWinner(nextSquares));
  };

  let status;
  if (calculateWinner(squares) != squares) {
    status = "Winner: " + (xIsNext ? "O" : "X");
  } else if (moves >= 9) {
    status = "Draw!!";
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="grid grid-cols-3 w-[120px]">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <Square
            key={index}
            value={squares[index]}
            onSquareClick={() => handleClick(index)}
          />
        ))}
      </div>
    </>
  );
}

export default Board;
