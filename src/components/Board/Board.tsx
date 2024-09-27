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

  const setPieces = () => {
    // 1, 7 -> King
    // 2, 8 -> Queen
    // 3, 9 -> Rook
    // 4, 10 -> Bishop
    // 5, 11 -> Knight
    // 6, 12 -> Pawn
    const newBoard = [...board];

    // White pieces
    newBoard[0] = 3; // Rook
    newBoard[1] = 5; // Knight
    newBoard[2] = 4; // Bishop
    newBoard[3] = 2; // Queen
    newBoard[4] = 1; // King
    newBoard[5] = 4; // Bishop
    newBoard[6] = 5; // Knight
    newBoard[7] = 3; // Rook

    for (let i = 8; i < 16; i++) {
      newBoard[i] = 6; // Pawn
    }

    // Black pieces
    newBoard[56] = 9; // Rook
    newBoard[57] = 11; // Knight
    newBoard[58] = 10; // Bishop
    newBoard[59] = 8; // Queen
    newBoard[60] = 7; // King
    newBoard[61] = 10; // Bishop
    newBoard[62] = 11; // Knight
    newBoard[63] = 9; // Rook

    for (let i = 48; i < 56; i++) {
      newBoard[i] = 12; // Pawn
    }

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
