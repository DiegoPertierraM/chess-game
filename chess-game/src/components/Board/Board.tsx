import './Board.css';
import { BoardProps } from '../../core/models/Board.types';
import { Square } from '../Square/Square';

export const Board: React.FC<BoardProps> = ({ board }) => {
  const isSquareBlack = (index: number) => {
    const row = Math.floor(index / 8); // Get the row (0 to 7)
    const col = index % 8; // Get the column (0 to 7)

    // Check if row is even or odd and adjust alternating colors
    return row % 2 === 0 ? col % 2 !== 0 : col % 2 === 0;
  };

  return (
    <main className="board">
      <h1>Chess</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} isBlack={isSquareBlack(index)} />
          );
        })}
      </section>
    </main>
  );
};
