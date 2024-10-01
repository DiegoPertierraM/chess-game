import './Board.css';
import { Square } from '../Square/Square';
import { useState } from 'react';
import { BoardProps, Piece } from '../../core/models/types';
import { isSquareBlack } from '../../helpers/isSquareBlack';

export const Board: React.FC<BoardProps> = ({ board, turn, onMove }) => {
  const [draggedPiecePosition, setDraggedPiecePosition] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const calculateIndex = (row: number, col: number) => row * 8 + col;

  const handleDragStart = (row: number, col: number) => {
    setDraggedPiecePosition({ row, col });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (targetRow: number, targetCol: number) => {
    if (
      draggedPiecePosition &&
      (draggedPiecePosition.row !== targetRow ||
        draggedPiecePosition.col !== targetCol)
    ) {
      const updatedBoard = board.map((rowArr) => [...rowArr]);
      const { row: draggedRow, col: draggedCol } = draggedPiecePosition;
      const draggedPiece = updatedBoard[draggedRow][draggedCol];
      const targetPiece = updatedBoard[targetRow][targetCol];

      if (
        draggedPiece &&
        draggedPiece.color === turn &&
        (!targetPiece || targetPiece.color !== draggedPiece.color)
      ) {
        updatedBoard[targetRow][targetCol] = draggedPiece;
        updatedBoard[draggedRow][draggedCol] = null;
        onMove(updatedBoard as Piece[][]);
        setDraggedPiecePosition(null);
      }
    }
  };

  return (
    <>
      <section className="board">
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => (
            <Square
              key={calculateIndex(rowIndex, colIndex)}
              index={calculateIndex(rowIndex, colIndex)}
              isBlack={isSquareBlack(calculateIndex(rowIndex, colIndex))}
              piece={piece as Piece}
              onDragStart={() => handleDragStart(rowIndex, colIndex)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(rowIndex, colIndex)}
            />
          ))
        )}
      </section>
    </>
  );
};
