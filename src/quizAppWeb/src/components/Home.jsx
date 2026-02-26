import { useState } from 'react';
import { animalQuiz, boardGameQuiz, mathQuiz, classicalMusicQuiz } from './quizzes';
import { motion } from 'framer-motion';
import { useRef } from 'react';

function Home({ onStart, setQuizType, setQuizName, setMode, setShowPopup, showPopup, setScreen }) {
  const boundsRef = useRef(null);
  return (
    <>
      <div className='text-4xl'>
        <h1>Welcome to PLAY A QUIZ OF YOUR CHOICE!</h1>
      </div>
      <div className='text-2xl'>
        <button onClick={() => setShowPopup(true)}>Start Quiz</button>
      </div>
      <div className='text-2xl'>
        <button onClick={() => setScreen('highScores')}>View High Scores</button>
      </div>
      <div className='text-2xl'>
        <button onClick={() => setScreen('gameHistory')}>View Game History</button>
      </div>
      <div
        ref={boundsRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: showPopup ? 'auto' : 'none',
        }}
      >
        {showPopup && (
          <motion.div drag dragMomentum={false} dragConstraints={boundsRef}>
            <Popup
              setQuizType={setQuizType}
              setQuizName={setQuizName}
              setMode={setMode}
              setShowPopup={setShowPopup}
              onStart={onStart}
            />
          </motion.div>
        )}
      </div>
    </>
  );
}

function Popup({ setQuizType, setQuizName, setMode, setShowPopup, onStart }) {
  const [popupScreen, setPopupScreen] = useState(0);
  return (
    <div className='popup'>
      {popupScreen === 0 && (
        <div>
          <h3 className='text-3xl'>Quiz Type:</h3>
          <div
            style={{
              scrollbarWidth: 'none',
              maxHeight: '10em',
            }}
            className='fade flow-root text-center 
            pt-[20px] pb-[10px]
            overflow-auto'
          >
            <button
              style={{ marginBottom: '10px' }}
              onClick={() => {
                setQuizType(mathQuiz);
                setQuizName('math');
                setPopupScreen(1);
              }}
            >
              Math
            </button>
            <button
              style={{ marginBottom: '10px' }}
              onClick={() => {
                setQuizType(animalQuiz);
                setQuizName('animal');
                setPopupScreen(1);
              }}
            >
              Animal Fun Facts
            </button>
            <button
              style={{ marginBottom: '10px' }}
              onClick={() => {
                setQuizType(boardGameQuiz);
                setQuizName('board game');
                setPopupScreen(1);
              }}
            >
              Board Games
            </button>
            <button
              style={{ marginBottom: '10px' }}
              onClick={() => {
                setQuizType(classicalMusicQuiz);
                setQuizName('classical music');
                setPopupScreen(1);
              }}
            >
              Classical Music
            </button>
          </div>
        </div>
      )}

      {popupScreen === 1 && (
        <div>
          <h3 className='text-3xl'>Difficulty:</h3>
          <button
            className='text-2xl'
            onClick={() => {
              setMode('easy');
              setShowPopup(false);
              onStart();
            }}
          >
            Easy
          </button>
          <button
            className='text-2xl'
            onClick={() => {
              setMode('hard');
              setShowPopup(false);
              onStart();
            }}
          >
            Hard
          </button>
        </div>
      )}

      <p className='popup-close text-2xl' onClick={() => setShowPopup(false)}>
        x
      </p>
    </div>
  );
}

export default Home;
