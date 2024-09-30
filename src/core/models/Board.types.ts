export type Pieces = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';

export type Piece = {
  identifier: string;
  position: number;
  type: Pieces;
  color: 'white' | 'black';
};

export type SquareProps = {
  index: number;
  isBlack: boolean;
  piece: Piece;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (index: number) => void;
};

export type BoardProps = {
  board: Piece[] | null[];
  turn: 'white' | 'black' | null;
  onMove: (updatedBoard: Piece[]) => void;
};
