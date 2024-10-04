import { Piece } from '../core/models/types';

const isPathClear = (
  start: [number, number],
  end: [number, number],
  board: (Piece | null)[][]
): boolean => {
  const [startRow, startCol] = start;
  const [endRow, endCol] = end;

  // Tracking in which direction the piece is moving
  const rowStep = Math.sign(endRow - startRow);
  const colStep = Math.sign(endCol - startCol);

  let currentRow = startRow + rowStep;
  let currentCol = startCol + colStep;

  // Continues the movement as long as there is no piece in the way
  while (currentRow !== endRow || currentCol !== endCol) {
    if (board[currentRow][currentCol]!.type !== null) {
      return false;
    }

    currentRow += rowStep;
    currentCol += colStep;
  }

  return true;
  // Only returns true for 1 square of distance, needs fix
};

const isLegalMovement = (
  piece: Piece,
  targetSquare: Piece,
  turn: string,
  board: Piece[][]
) => {
  if (piece.color !== turn) return false;
  if (targetSquare.color === piece.color) return false;

  const rowDiff = Math.abs(piece.position[0] - targetSquare.position[0]);
  const colDiff = Math.abs(piece.position[1] - targetSquare.position[1]);

  const isHorizontalMove = piece.position[0] === targetSquare.position[0];
  const isVerticalMove = piece.position[1] === targetSquare.position[1];
  const isDiagonalMove = rowDiff === colDiff;

  switch (piece?.type) {
    case 'pawn':
      // Pawns can capture backwards, fix
      if (!isVerticalMove) {
        if (targetSquare.type === null) {
          return false;
        } else if (rowDiff === 1) {
          return true;
        }
      }

      if (turn === 'white' && !targetSquare?.identifier) {
        if (
          targetSquare?.position[0] === piece.position[0] + 1 ||
          (targetSquare?.position[0] === piece.position[0] + 2 &&
            piece.isFirstMove === true)
        ) {
          if (piece.isFirstMove === true) {
            piece.isFirstMove = false;
          }

          return true;
        }
      }

      if (turn === 'black' && !targetSquare?.identifier) {
        if (
          targetSquare?.position[0] === piece.position[0] - 1 ||
          (targetSquare?.position[0] === piece.position[0] - 2 &&
            piece.isFirstMove === true)
        ) {
          if (piece.isFirstMove === true) {
            piece.isFirstMove = false;
          }

          return true;
        }
      }

      return false;
    case 'king':
      if (rowDiff <= 1 && colDiff <= 1 && piece.color !== targetSquare.color) {
        return true;
      }

      return false;
    case 'queen':
      if (isHorizontalMove || isVerticalMove || isDiagonalMove) {
        if (isPathClear(piece.position, targetSquare.position, board)) {
          return true;
        }
      }

      return false;
    case 'rook':
      return false;
    case 'bishop':
      return false;
    case 'knight':
      return false;
    default:
      return false;
  }
};

const isLegalCapture = (
  piece: Piece,
  targetSquare: Piece,
  turn: string,
  board: (Piece | null)[][]
) => {
  if (targetSquare?.type === 'king') return false;
  if (isLegalMovement(piece, targetSquare, turn, board as Piece[][]) === false)
    return false;

  switch (piece?.type) {
    case 'pawn':
      if (turn === 'white') {
        if (
          targetSquare.position[0] === piece.position[0] + 1 &&
          (targetSquare.position[1] === piece.position[1] + 1 ||
            targetSquare.position[1] === piece.position[1] - 1)
        )
          return true;
      }

      if (turn === 'black') {
        if (
          targetSquare.position[0] === piece.position[0] - 1 &&
          (targetSquare.position[1] === piece.position[1] + 1 ||
            targetSquare.position[1] === piece.position[1] - 1)
        )
          return true;
      }

      return false;
  }

  return true;
};

export const isPieceMovementLegal = (
  piece: Piece | null,
  targetSquare: Piece | null,
  turn: string | null,
  board: (Piece | null)[][]
) => {
  if (
    (piece &&
      isLegalMovement(
        piece,
        targetSquare as Piece,
        turn as string,
        board as Piece[][]
      )) ||
    isLegalCapture(piece as Piece, targetSquare as Piece, turn as string, board)
  ) {
    return true;
  }

  return false;
};
