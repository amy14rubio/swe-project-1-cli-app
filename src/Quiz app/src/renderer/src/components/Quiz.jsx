import { useState, useEffect } from "react";
import scoreCalc from "../utils/scoreCalc.js";
import formatDate from "../utils/formatDate.js";

function CountdownTimer ({ secondsLeft, setSecondsLeft, isRunning, onTimeUp }) {
  useEffect(() => {
    let timerId;
    if (isRunning && secondsLeft > 0) {
      timerId = setInterval(() => {
        setSecondsLeft(prevSeconds => prevSeconds - 1);
      }, 1000); // Update every second
    }
    
    if (secondsLeft === 0) onTimeUp();

    return () => clearInterval(timerId); // Cleanup on unmount or re-render
  }, [isRunning, secondsLeft]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (formatTime(secondsLeft));
}

function Quiz({ mode, quizType, quizName, counter, setCounter, questions, score, setScore, setScreen }) {
  const [feedback, setFeedback] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [isRunning, setIsRunning] = useState(true);
  const [timerMessage, setTimerMessage] = useState("");

  const saveScore = async (user, quizName, score) => {
  try {
    const currentHighscores = await window.api.readHighscores() || [];

    const index = currentHighscores.findIndex(p => p.name === user && p.quizType === quizName);

    if (index !== -1) {
      if (score >= currentHighscores[index].score) {
        currentHighscores[index].score = score;
        currentHighscores[index].date = formatDate();
      }
    } else {
      currentHighscores.push({
        name: user,
        quizType: quizName,
        score: score,
        date: formatDate()
      });
    }

    const topFive = currentHighscores
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    await window.api.writeHighscores(topFive);

    } catch (err) {
      console.error("Failed to save highscore", err);
    }
};

const saveGame = (quizName, score) => {
  const newEntry = {
    quizType: quizName,
    score: score,
    date: formatDate(),
  };

  window.api.readGameHistory().then((current = []) => {
    const updated = [...current, newEntry];
    window.api.writeGameHistory(updated);
  });
};

  const resetTimer = () => setSecondsLeft(5);

  useEffect(() => {
  if (mode === "easy") {
    setIsRunning(false);
  }
  }, [mode]);

  const onTimeUp = () => {
    resetTimer();
    setTimerMessage("Times up!!")
    counter + 1 < quizType.length ? setCounter(counter + 1) : setScreen('results')
  };

  const handleChoice = (c, quizType) => {
    setTimerMessage("");
    const i = quizType.findIndex((obj) => obj.question === questions[counter].question)
    if (c === quizType[i].choices[3]) {
      setScore(score + 1)  
      setFeedback(
        <>"{c}" is correct! <br />
        Score: {score + 1}/{quizType.length} ({scoreCalc(score + 1, quizType)})%</>
      ) 
    } else{ 
      setFeedback(
        <> Incorrect!! <br />
        Score: {score}/{quizType.length} ({scoreCalc(score, quizType)}%)`
        </>
      );
    }
    
    //moves to next question and at end of quiz redirects to home page
    if (counter + 1 < quizType.length) {
      setCounter(counter + 1) 
    } else{ 
      saveScore("player", quizName, scoreCalc(score + (c === quizType[i].choices[3] ? 1 : 0), quizType));
      saveGame(quizName, scoreCalc(score + (c === quizType[i].choices[3] ? 1 : 0), quizType))
      setScreen('results');
    }
    };

  return (<>
    {/* prints questions */}
    <div>{questions[counter].question }</div>
    {/* prints choices */}
    <div>{questions[counter].choices.map((c,i) => (<div key={i} onClick={() => {handleChoice(c, quizType); resetTimer();}}>{c}</div>) )}</div>
    {/* prints feedback */}
    <div>{feedback}</div>
    
     <div> {timerMessage} { mode === "hard" && <CountdownTimer
      secondsLeft={secondsLeft}
      setSecondsLeft={setSecondsLeft}
      isRunning={isRunning}
      onTimeUp={onTimeUp}
     />}</div>
    </>)
}

export default Quiz