import { Piece } from '../core/models/types';

const isLegalMovement = (piece: Piece, targetSquare: Piece, turn: string) => {
  if (piece.color !== turn) return false;

  const rowDiff = Math.abs(piece.position[0] - targetSquare.position[0]);
  const colDiff = Math.abs(piece.position[1] - targetSquare.position[1]);

  switch (piece?.type) {
    case 'pawn':
      console.log('is pawn');
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

const isLegalCapture = (piece: Piece, targetSquare: Piece, turn: string) => {
  if (!targetSquare?.identifier || piece.color !== turn) return false;
  console.log(piece?.position);
  console.log(targetSquare?.position);

  if (isLegalMovement(piece, targetSquare, turn) === false) return false;

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
    case 'king':
      if (targetSquare?.type === 'king') return false;
      if (targetSquare?.color !== piece.color) return true;

      return false;
  }

  return true;
};

export const isPieceMovementLegal = (
  piece: Piece | null,
  targetSquare: Piece | null,
  turn: string | null
) => {
  if (
    (piece && isLegalMovement(piece, targetSquare as Piece, turn as string)) ||
    isLegalCapture(piece as Piece, targetSquare as Piece, turn as string)
  ) {
    return true;
  }

  return false;
};
