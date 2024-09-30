import './Board.css';
import { Square } from '../Square/Square';
import { useState } from 'react';
import { BoardProps, Piece } from '../../core/models/Board.types';
import { isSquareBlack } from '../../helpers/isSquareBlack';

export const Board: React.FC<BoardProps> = ({ board, turn, onMove }) => {
  const [draggedPieceIndex, setDraggedPieceIndex] = useState<number | null>(
    null
  );

  const handleDragStart = (index: number) => {
    setDraggedPieceIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedPieceIndex !== null && draggedPieceIndex !== index) {
      const updatedBoard = [...board];
      if (
        updatedBoard[draggedPieceIndex]?.color !== updatedBoard[index]?.color &&
        updatedBoard[draggedPieceIndex]?.color === turn
      ) {
        updatedBoard[index] = updatedBoard[draggedPieceIndex];
        updatedBoard[draggedPieceIndex] = null;
        onMove(updatedBoard as Piece[]);
        setDraggedPieceIndex(null);
      }
    }
  };

  return (
    <>
      <section className="board">
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
    </>
  );
};
