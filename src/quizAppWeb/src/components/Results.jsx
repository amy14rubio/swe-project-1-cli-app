import scoreCalc from '../utils/scoreCalc.js';
import formatDate from '../utils/formatDate.js';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRef } from 'react';

import { readHighscores, writeHighscores } from '../utils/storage';

function Results({ isHighscore, score, setScreen, quizType, quizName }) {
  const boundsRef = useRef(null);
  const [inputScreen, setInputScreen] = useState(0);
  useEffect(() => {
    if (isHighscore) setInputScreen(1);
  }, []);

  return (
    <>
      <div className='text-4xl'>
        <h1>Your Results!</h1>
      </div>
      <div className='text-2xl'>Score: {scoreCalc(score, quizType)}%</div>
      <div className='text-2xl text-center'>*.✧ Thanks for playing!! ✧.*</div>
      <div>
        <button className='text-2xl mt-4' onClick={() => setScreen('home')}>
          Back home
        </button>
      </div>

      <div
        ref={boundsRef}
        style={{
          position: 'fixed',
          inset: 0,
          overflow: 'hidden',
          ...(inputScreen === 0 ? { display: 'none' } : {}),
        }}
      >
        {isHighscore && (
          <motion.div drag dragMomentum={false} dragConstraints={boundsRef}>
            <UserInputForm
              quizName={quizName}
              quizType={quizType}
              score={score}
              inputScreen={inputScreen}
              setInputScreen={setInputScreen}
            />
          </motion.div>
        )}
      </div>
    </>
  );
}

function UserInputForm({ quizName, quizType, score, inputScreen, setInputScreen }) {
  const [inputValue, setInputValue] = useState('');

  const saveScore = async (name, score) => {
    try {
      const currentHighscores = readHighscores();

      const index = currentHighscores.findIndex((p) => p.name === name && p.quizType === quizName);

      if (index !== -1) {
        if (score >= currentHighscores[index].score) {
          currentHighscores[index].score = score;
          currentHighscores[index].date = formatDate();
        }
      } else {
        currentHighscores.push({
          name: name || 'player',
          quizType: quizName,
          score: score,
          date: formatDate(),
        });
      }

      const topFive = currentHighscores.sort((a, b) => b.score - a.score).slice(0, 5);

      writeHighscores(topFive);
    } catch (err) {
      console.error('Failed to save highscore', err);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await saveScore(inputValue, scoreCalc(score, quizType));
    setInputScreen(2);
  };

  return (
    <div className='popup' style={inputScreen === 0 ? { display: 'none' } : {}}>
      {inputScreen === 0 && <div></div>}

      {inputScreen === 1 && (
        <div>
          <h3 className='text-2xl w-[20ch] break-words text-center mt-4'>
            Congrats you made it to highscores!
          </h3>
          <form className='text-center' onSubmit={handleSubmit}>
            <label className='text-xl' htmlFor='userInput'>
              Enter your name:
            </label>
            <br />
            <input
              type='text' // Specifies a single-line text input field
              id='userInput'
              value={inputValue} // Binds the input's value to the state variable
              onChange={handleInputChange} // Calls handleInputChange whenever the value changes
              placeholder='⟢ name'
              className='w-[80%] mt-4 text-current placeholder-current caret-pink-400 pl-2'
            />
            <br />
            <button className='text-lg mt-4' type='submit'>
              Submit
            </button>
          </form>
        </div>
      )}

      {inputScreen === 2 && (
        <div>
          <h1 className='text-3xl w-[15ch] break-words text-center mt-4'>
            View your score on the highscore board!
          </h1>
        </div>
      )}

      <p className='popup-close text-2xl' onClick={() => setInputScreen(0)}>
        x
      </p>
    </div>
  );
}

export default Results;
