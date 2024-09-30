export const assignPieceName = (piece: string) => {
  let pieceName: string;
  switch (piece) {
    case '1':
    case '7':
      pieceName = 'king';
      break;
    case '2':
    case '8':
      pieceName = 'queen';
      break;
    case '3':
    case '9':
      pieceName = 'rook';
      break;
    case '4':
    case '10':
      pieceName = 'bishop';
      break;
    case '5':
    case '11':
      pieceName = 'knight';
      break;
    default:
      pieceName = 'unknown';
  }

  return pieceName;
};
