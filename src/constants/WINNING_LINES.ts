import { BOARD_SIZE } from "./BOARD_SIZE";

function generateWinningRows(size: number) {
  return Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) => i * size + j)
  );
}

function generateWinningCols(size: number) {
  return Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) => j * size + i)
  );
}

function generateWinningDiagonals(size: number) {
  return [
    Array.from({ length: size }, (_, i) => i * size + i),
    Array.from({ length: size }, (_, i) => i * size + (size - 1 - i))
  ];
}

export const WINNING_LINES = [
  ...generateWinningRows(BOARD_SIZE),
  ...generateWinningCols(BOARD_SIZE),
  ...generateWinningDiagonals(BOARD_SIZE)
] as const;
