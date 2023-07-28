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

type BoardValue = {
  xIsNext: boolean;
  squares: Array<string>;
  onPlay: (value: Array<string>) => void;
  moves: number;
  isEnd: boolean;
};

function Board({ xIsNext, squares, onPlay, moves, isEnd }: BoardValue) {
  let status;
  let win = moves >= 6;

  const handleClick = (i: number) => {
    if (squares[i] || isEnd) {
      return;
    }
    // console.log(isEnd);
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  };

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
        win = true;
        // isEnd = true;
        // console.log("Asdf", isEnd);
        return calculatedSquares;
      }
    }
    win = false;
    return squares;
  };

  if (isEnd) {
    status = "Winner: " + (xIsNext ? "O" : "X");
  } else if (moves >= 9) {
    status = "Draw!!";
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div>{status}</div>
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
