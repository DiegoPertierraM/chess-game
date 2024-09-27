import { useState } from 'react';
import './App.css';
import { Board } from './components/Board/Board';

function App() {
  const [board, setBoard] = useState(Array(64).fill(null));

  return (
    <>
      <Board board={board} />
    </>
  );
}

export default App;
