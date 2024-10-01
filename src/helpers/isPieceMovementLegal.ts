import { Piece } from '../core/models/types';

const isLegalMovement = (piece: Piece, targetPiece: Piece, turn: string) => {
  switch (piece?.type) {
    case 'pawn':
      console.log('is pawn');
      if (turn === 'white' && !targetPiece?.identifier) {
        if (
          targetPiece?.position[0] === piece.position[0] + 1 ||
          (targetPiece?.position[0] === piece.position[0] + 2 &&
            piece.isFirstMove === true)
        ) {
          if (piece.isFirstMove === true) {
            piece.isFirstMove = false;
          }

          return true;
        }
      }

      if (turn === 'black' && !targetPiece?.identifier) {
        if (
          targetPiece?.position[0] === piece.position[0] - 1 ||
          (targetPiece?.position[0] === piece.position[0] - 2 &&
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
      console.log('is king');
      return true;
    case 'queen':
      console.log('is queen');
      return true;
    case 'rook':
      console.log('is rook');
      return true;
    case 'bishop':
      console.log('is bishop');
      return true;
    case 'knight':
      console.log('is knight');
      return true;
    default:
      return false;
  }
};

const isLegalCapture = (piece: Piece, targetPiece: Piece, turn: string) => {
  if (!targetPiece?.identifier) return false;
  console.log(piece?.position);
  console.log(targetPiece?.position);
  switch (piece?.type) {
    case 'pawn':
      if (turn === 'white') {
        if (
          targetPiece.position[0] === piece.position[0] + 1 &&
          (targetPiece.position[1] === piece.position[1] + 1 ||
            targetPiece.position[1] === piece.position[1] - 1)
        )
          return true;
      }

      if (turn === 'black') {
        if (
          targetPiece.position[0] === piece.position[0] - 1 &&
          (targetPiece.position[1] === piece.position[1] + 1 ||
            targetPiece.position[1] === piece.position[1] - 1)
        )
          return true;
      }

      return false;
    case 'king':
      if (targetPiece?.type === 'king') return false;
  }

  return true;
};

export const isPieceMovementLegal = (
  piece: Piece | null,
  targetPiece: Piece | null,
  turn: string | null
) => {
  const isTurn = piece?.color === turn ? true : false;

  if (
    (piece &&
      isTurn &&
      isLegalMovement(piece, targetPiece as Piece, turn as string)) ||
    isLegalCapture(piece as Piece, targetPiece as Piece, turn as string)
  ) {
    return true;
  }
};
