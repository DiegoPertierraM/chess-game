import { SquareProps } from '../../core/models/Board.types';
import './Square.css';

export const Square: React.FC<SquareProps> = ({ index, isBlack }) => {
  return (
    <div
      className="square"
      style={{
        backgroundColor: isBlack ? '#b58863' : '#f0d9b5',
      }}
    ></div>
  );
};
