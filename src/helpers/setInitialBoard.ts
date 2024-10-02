import { Piece, Pieces } from '../core/models/types';
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

  const newBoard: (Piece | null)[][] = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      newBoard[row][col] = {
        position: [row, col],
        type: null, // Initially, no piece is on the square
      } as Piece;
    }
  }

  // Place white major pieces on first row
  initialBoardSetup.white.pieces.ids.forEach((piece, index) => {
    newBoard[0][index] = {
      identifier: `${piece}`,
      position: [0, index], // Now position is a pair [row, column]
      type: assignPieceName(piece) as Pieces,
      color: 'white',
    };
  });

  // Place white pawns on row 1 (second row)
  initialBoardSetup.white.pieces.pawns.forEach((_, index) => {
    newBoard[1][index] = {
      identifier: '6',
      position: [1, index],
      type: 'pawn',
      color: 'white',
      isFirstMove: true,
    };
  });

  // Place black major pieces on last row
  initialBoardSetup.black.pieces.ids.forEach((piece, index) => {
    newBoard[7][index] = {
      identifier: `${piece}`,
      position: [7, index],
      type: assignPieceName(piece) as Pieces,
      color: 'black',
    };
  });

  // Place black pawns on row 6 (second-to-last row)
  initialBoardSetup.black.pieces.pawns.forEach((_, index) => {
    newBoard[6][index] = {
      identifier: '12',
      position: [6, index],
      type: 'pawn',
      color: 'black',
      isFirstMove: true,
    };
  });

  return newBoard;
};
