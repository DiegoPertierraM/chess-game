export type Pieces =
  | 'king'
  | 'queen'
  | 'rook'
  | 'bishop'
  | 'knight'
  | 'pawn'
  | null;

export type Piece = {
  identifier?: string;
  position: [number, number];
  type: Pieces;
  color?: 'white' | 'black';
  isFirstMove?: boolean;
};

export type SquareProps = {
  index: number;
  isBlack: boolean;
  piece: Piece;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.MouseEvent<HTMLDivElement>, index: number) => void;
};

export type BoardProps = {
  board: (Piece | null)[][];
  turn: 'white' | 'black' | null;
  onMove: (updatedBoard: Piece[][]) => void;
};
