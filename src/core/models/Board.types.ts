export type Piece = {
  identifier: string;
  position: number;
};

export type SquareProps = {
  index: number;
  isBlack: boolean;
  piece: Piece;
};
