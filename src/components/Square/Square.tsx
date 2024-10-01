import { SquareProps } from '../../core/models/types';
import './Square.css';

export const Square: React.FC<SquareProps> = ({
  index,
  isBlack,
  piece,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  const squareColor = isBlack ? 'black' : 'white';

  return (
    <div
      className={`square ${squareColor}`}
      onDragOver={onDragOver}
      onDrop={() => onDrop(index)}
    >
      {piece && (
        <img
          src={`img/pieces/normal-set/${piece.identifier}.svg`}
          alt={`${piece} chess piece`}
          draggable={true}
          onDragStart={() => onDragStart(index)}
        />
      )}
    </div>
  );
};
