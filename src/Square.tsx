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

export default Square;
