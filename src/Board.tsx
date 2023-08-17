import Square from "./Square";
import { BOARD_SIZE } from "./constants/BOARD_SIZE";

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
  } else if (moves >= BOARD_SIZE * BOARD_SIZE) {
    status = "Draw!!";
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div>{status}</div>
      <div className={`grid grid-cols-${BOARD_SIZE} w-[${BOARD_SIZE * 40}px]`}>
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
