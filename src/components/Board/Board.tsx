import './Board.css';
import { Square } from '../Square/Square';
import { useState } from 'react';
import { setInitialBoard } from '../../helpers/setInitialBoard';
import { Piece } from '../../core/models/Board.types';

export const Board = () => {
  const [board, setBoard] = useState(setInitialBoard());
  const [draggedPieceIndex, setDraggedPieceIndex] = useState<number | null>(
    null
  );

  const isSquareBlack = (index: number) => {
    const row = Math.floor(index / 8);
    const col = index % 8;
    return row % 2 === 0 ? col % 2 !== 0 : col % 2 === 0;
  };

  const handleDragStart = (index: number) => {
    setDraggedPieceIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Allow drop by preventing default behavior
  };

  const handleDrop = (index: number) => {
    if (draggedPieceIndex !== null && draggedPieceIndex !== index) {
      const updatedBoard = [...board];
      updatedBoard[index] = updatedBoard[draggedPieceIndex]; // Move the piece to the new index
      updatedBoard[draggedPieceIndex] = null; // Clear the old position
      setBoard(updatedBoard as Piece[]); // Update the board state
      setDraggedPieceIndex(null); // Clear the dragged piece index
    }
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
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
            />
          );
        })}
      </section>
    </main>
  );
};
