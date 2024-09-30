export const getRandomTurn = () => {
  return Math.random() < 0.5 ? 'white' : 'black';
};
