import { SquareProps } from '../../core/models/Board.types';
import './Square.css';

export const Square: React.FC<SquareProps> = ({ isBlack, piece }) => {
  return (
    <div
      className="square"
      style={{
        backgroundColor: isBlack ? '#b58863' : '#f0d9b5',
      }}
    >
      {piece && (
        <img
          src={`img/pieces/normal-set/${piece.identifier}.svg`}
          alt={`${piece} chess piece`}
        />
      )}
    </div>
  );
};
