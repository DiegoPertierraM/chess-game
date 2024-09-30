import { Piece, Pieces } from '../core/models/Board.types';
import { assignPieceName } from './assignPieceName';

export const setInitialBoard = () => {
  const initialBoardSetup = {
    white: {
      pieces: {
        ids: ['3', '5', '4', '2', '1', '4', '5', '3'],
        pawns: Array(8).fill('6'),
      },
    },
    black: {
      pieces: {
        ids: ['9', '11', '10', '8', '7', '10', '11', '9'],
        pawns: Array(8).fill('12'),
      },
    },
  };

  const newBoard: Piece[] | null[] = Array(64).fill(null);

  initialBoardSetup.white.pieces.ids.forEach((piece, index) => {
    newBoard[index] = {
      identifier: `${piece}`,
      position: index,
      type: assignPieceName(piece) as Pieces,
      color: 'white',
    };
  });

  initialBoardSetup.white.pieces.pawns.forEach((_, index) => {
    newBoard[8 + index] = {
      identifier: '6',
      position: 8 + index,
      type: 'pawn',
      color: 'white',
    };
  });

  initialBoardSetup.black.pieces.ids.forEach((piece, index) => {
    newBoard[56 + index] = {
      identifier: `${piece}`,
      position: 56 + index,
      type: assignPieceName(piece) as Pieces,
      color: 'black',
    };
  });

  initialBoardSetup.black.pieces.pawns.forEach((_, index) => {
    newBoard[48 + index] = {
      identifier: '12',
      position: 48 + index,
      type: 'pawn',
      color: 'black',
    };
  });

  return newBoard;
};
