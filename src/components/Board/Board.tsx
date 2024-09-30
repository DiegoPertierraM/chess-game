import './Board.css';
import { Square } from '../Square/Square';
import { useState } from 'react';
import { setInitialBoard } from '../helpers/setInitialBoard';
import { Piece } from '../../core/models/Board.types';

export const Board = () => {
  const [board, setBoard] = useState(setInitialBoard());

  const isSquareBlack = (index: number) => {
    const row = Math.floor(index / 8);
    const col = index % 8;
    return row % 2 === 0 ? col % 2 !== 0 : col % 2 === 0;
  };

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
              piece={piece as Piece}
            />
          );
        })}
      </section>
    </main>
  );
};
