export type Piece = {
  identifier: string;
  position: number;
};

export type SquareProps = {
  index: number;
  isBlack: boolean;
  piece: Piece;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (index: number) => void;
};
