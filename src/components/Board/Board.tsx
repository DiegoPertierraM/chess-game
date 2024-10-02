import './Board.css';
import { Square } from '../Square/Square';
import { useState } from 'react';
import { BoardProps, Piece } from '../../core/models/types';
import { isSquareBlack } from '../../helpers/isSquareBlack';
import { isPieceMovementLegal } from '../../helpers/isPieceMovementLegal';

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

  const handleDrop = (
    targetRow: number,
    targetCol: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    // Cancel the drag if the mouse right clicks
    if (event.button === 2) {
      console.log('Right-click detected, move canceled');
      setDraggedPiecePosition(null);
      return;
    }

    if (
      draggedPiecePosition &&
      (draggedPiecePosition.row !== targetRow ||
        draggedPiecePosition.col !== targetCol)
    ) {
      const updatedBoard = board.map((rowArr) => [...rowArr]);
      const { row: draggedRow, col: draggedCol } = draggedPiecePosition;
      const draggedPiece = updatedBoard[draggedRow][draggedCol];
      const targetSquare = updatedBoard[targetRow][targetCol];

      if (isPieceMovementLegal(draggedPiece, targetSquare, turn)) {
        updatedBoard[targetRow][targetCol] = draggedPiece as Piece;
        updatedBoard[draggedRow][draggedCol] = {
          position: [draggedRow, draggedCol],
          type: null,
        };
        draggedPiece!.position = [targetRow, targetCol];
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
              onDrop={(e) => handleDrop(rowIndex, colIndex, e)}
            />
          ))
        )}
      </section>
    </>
  );
};
