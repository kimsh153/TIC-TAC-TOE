import Square from "./Square";

type BoardValue = {
  xIsNext: boolean;
  squares: Array<string>;
  onPlay: (value: Array<string>) => void;
  moves: number;
  isEnd: boolean;
  squaresArray: Array<number>;
};

function Board({
  xIsNext,
  squares,
  onPlay,
  moves,
  isEnd,
  squaresArray,
}: BoardValue) {
  let status;

  const handleClick = (i: number) => {
    if (squares[i] || isEnd) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
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
        {squaresArray.map((index) => (
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
