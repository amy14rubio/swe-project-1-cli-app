import { useState, useEffect } from 'react';
import scoreCalc from '../utils/scoreCalc.js';
import formatDate from '../utils/formatDate.js';

import { readHighscores, readGameHistory, writeGameHistory } from '../utils/storage';

function CountdownTimer({ secondsLeft, setSecondsLeft, isRunning, onTimeUp }) {
  useEffect(() => {
    let timerId;
    if (isRunning && secondsLeft > 0) {
      timerId = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000); // Update every second
    }

    if (secondsLeft === 0 && isRunning) {
      onTimeUp();
    }

    return () => clearInterval(timerId); // Cleanup on unmount or re-render
  }, [isRunning, secondsLeft, onTimeUp]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return formatTime(secondsLeft);
}

function Quiz({
  setIsHighscore,
  mode,
  quizType,
  quizName,
  counter,
  setCounter,
  questions,
  score,
  setScore,
  setScreen,
}) {
  const [feedback, setFeedback] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [isRunning, setIsRunning] = useState(true);
  const [timerMessage, setTimerMessage] = useState('');
  const [highscores, setHighscores] = useState([]);

  const saveGame = (quizName, score) => {
    const newEntry = {
      quizType: quizName,
      score,
      date: formatDate(),
    };

    const current = readGameHistory();
    const updated = [...current, newEntry];
    writeGameHistory(updated);
  };

  const resetTimer = () => setSecondsLeft(5);

  useEffect(() => {
    if (mode === 'easy') {
      setIsRunning(false);
    }
  }, [mode]);

  useEffect(() => {
    const data = readHighscores();
    setHighscores(Array.isArray(data) ? data : []);
  }, []);

  const onTimeUp = () => {
    endQuestion({ c: null, quizType });
  };

  const handleChoice = (c, quizType) => {
    endQuestion({ c: c, quizType });
  };

  const endQuestion = ({ c = null, quizType }) => {
    setTimerMessage('');
    const i = quizType.findIndex((obj) => obj.question === questions[counter].question);

    if (c !== null) {
      if (c === quizType[i].choices[3]) {
        setScore((prev) => prev + 1);
        setFeedback(
          <>
            {c} is correct! <br />
            {/* Score: {score + 1}/{quizType.length} */}
          </>
        );
      } else {
        setFeedback(
          <>
            Incorrect!! <br />
            {/* Score: {score}/{quizType.length} */}
          </>
        );
      }
    } else {
      setTimerMessage('Times up!! ');
    }

    // move forward or finish quiz
    if (counter + 1 < quizType.length) {
      setCounter((prev) => prev + 1);
      resetTimer();
    } else {
      const finalScore = scoreCalc(score + (c === quizType[i].choices[3] ? 1 : 0), quizType);

      // Get highscores for this quiz only
      const quizScores = highscores
        .filter((entry) => entry.quizType === quizName)
        .map((entry) => entry.score);

      // Find the lowest score in the top 5 (or 0 if fewer than 5)
      const lowestTopScore = quizScores.length < 5 ? 0 : Math.min(...quizScores);

      // Check if final score is higher than the lowest top score
      const newHighscore = finalScore > lowestTopScore || quizScores.length < 5;

      setIsHighscore(newHighscore);

      saveGame(quizName, finalScore);
      setScreen('results');
    }
  };

  return (
    <div>
      {/* prints questions */}
      <div className='text-2xl w-[20ch] break-words text-center'>{questions[counter].question}</div>
      {/* prints choices */}
      <div>
        {questions[counter].choices.map((c, i) => (
          <button
            className='text-2xl'
            key={i}
            onClick={() => {
              handleChoice(c, quizType);
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* prints feedback */}
      <div
        key={counter}
        style={{
          ...(mode === 'easy' ? { animation: 'pulse 1s steps(1, end) forwards' } : {}),
          ...(mode === 'hard' ? { animation: 'pulse-stay 1s steps(1, end) forwards' } : {}),
          ...(counter === 0 && mode === 'easy' ? { display: 'none' } : {}),
        }}
        className='feedback text-center text-xl'
      >
        {feedback} {timerMessage}
        {mode === 'hard' && (
          <CountdownTimer
            secondsLeft={secondsLeft}
            setSecondsLeft={setSecondsLeft}
            isRunning={isRunning}
            onTimeUp={onTimeUp}
          />
        )}
      </div>

      <div></div>
    </div>
  );
}

export default Quiz;
