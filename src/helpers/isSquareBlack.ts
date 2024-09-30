export const isSquareBlack = (index: number) => {
  const row = Math.floor(index / 8);
  const col = index % 8;
  return row % 2 === 0 ? col % 2 !== 0 : col % 2 === 0;
};
