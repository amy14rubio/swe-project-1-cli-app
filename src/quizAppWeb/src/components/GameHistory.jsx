import { useEffect, useState } from 'react';
import { readGameHistory } from '../utils/storage';

function GameHistory({ setScreen }) {
  const [gameHistory, setGameHistory] = useState([]);
  useEffect(() => {
    try {
      const data = readGameHistory();
      setGameHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load game history:', err);
      setGameHistory([]);
    }
  }, []);

  return (
    <div className='w-screen'>
      <h1 className='text-4xl'>Game History ⁺⋆ ࿔</h1>
      <div
        style={{
          scrollbarWidth: 'none',
        }}
        className='fade text-2xl sm:text-xl text-center 
          w-screen h-[12em] 
          pt-[20px] pb-[10px] 
          overflow-auto flow-root'
      >
        {gameHistory.length > 0 ? (
          <div className='flex p-4'>
            {gameHistory.toReversed().map((user, i) => (
              <div className='highlight flex pl-12 pr-12 pt-0 py-2' key={`${user.quizType}-${i}`}>
                {user.score} • {user.quizType} • {user.date}
              </div>
            ))}
          </div>
        ) : (
          <div>No game history yet</div>
        )}{' '}
      </div>

      <button className='text-2xl mt-4' onClick={() => setScreen('home')}>
        Back home
      </button>
    </div>
  );
}

export default GameHistory;
