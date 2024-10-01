import './Game.css';
import { useState } from 'react';
import { Board } from '../Board/Board';
import { Piece } from '../../core/models/types';
import { setInitialBoard } from '../../helpers/setInitialBoard';
import { getRandomTurn } from '../../helpers/getRandomTurn';

export const Game = () => {
  const [turn, setTurn] = useState<'white' | 'black'>(getRandomTurn());
  const [board, setBoard] = useState(setInitialBoard());
  const [winner, setWinner] = useState<null | 'white' | 'black'>(null);

  const toggleTurn = () => {
    setTurn((prevTurn) => (prevTurn === 'white' ? 'black' : 'white'));
  };

  const handleMove = (updatedBoard: Piece[][]) => {
    if (!winner) {
      setBoard(updatedBoard);
      checkForWinner(updatedBoard);
      toggleTurn();
    }
  };

  const checkForWinner = (updatedBoard: Piece[][]) => {
    const hasWhiteKing = updatedBoard.some((row) =>
      row.some((piece) => piece?.type === 'king' && piece?.color === 'white')
    );
    const hasBlackKing = updatedBoard.some((row) =>
      row.some((piece) => piece?.type === 'king' && piece?.color === 'black')
    );

    if (!hasWhiteKing) {
      setWinner('black');
    } else if (!hasBlackKing) {
      setWinner('white');
    }
  };

  return (
    <main className="game">
      <h1>Chess</h1>
      {winner ? (
        <p>{winner?.toUpperCase()} WINS!! 🎆</p>
      ) : (
        <h2>Current Turn: {turn.toUpperCase()}</h2>
      )}
      <Board board={board} turn={turn} onMove={handleMove} />
    </main>
  );
};
