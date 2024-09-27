import './Board.css';
import { Square } from '../Square/Square';
import { useEffect, useState } from 'react';

export const Board = () => {
  const [board, setBoard] = useState(Array(64).fill(null));

  const isSquareBlack = (index: number) => {
    const row = Math.floor(index / 8);
    const col = index % 8;
    return row % 2 === 0 ? col % 2 !== 0 : col % 2 === 0;
  };

  const initialBoardSetup = {
    white: {
      pieces: {
        names: [
          'rook',
          'knight',
          'bishop',
          'queen',
          'king',
          'bishop',
          'knight',
          'rook',
        ],
        ids: ['3', '5', '4', '2', '1', '4', '5', '3'],
        pawns: Array(8).fill(6),
      },
    },
    black: {
      pieces: {
        names: [
          'rook',
          'knight',
          'bishop',
          'queen',
          'king',
          'bishop',
          'knight',
          'rook',
        ],
        ids: ['9', '11', '10', '8', '7', '10', '11', '9'],
        pawns: Array(8).fill(12),
      },
    },
  };

  const setPieces = () => {
    const newBoard = [...board];

    initialBoardSetup.white.pieces.ids.forEach((piece, index) => {
      newBoard[index] = `${piece}`;
    });

    initialBoardSetup.white.pieces.pawns.forEach((_, index) => {
      newBoard[8 + index] = 6;
    });

    initialBoardSetup.black.pieces.ids.forEach((piece, index) => {
      newBoard[56 + index] = `${piece}`;
    });

    initialBoardSetup.black.pieces.pawns.forEach((_, index) => {
      newBoard[48 + index] = 12;
    });

    return newBoard;
  };

  useEffect(() => {
    const initialBoard = setPieces();
    setBoard(initialBoard);
  }, []);

  return (
    <main className="board">
      <h1>Chess</h1>
      <section className="game">
        {board.map((piece, index) => {
          return (
            <Square
              key={index}
              index={index}
              isBlack={isSquareBlack(index)}
              piece={piece}
            />
          );
        })}
      </section>
    </main>
  );
};
