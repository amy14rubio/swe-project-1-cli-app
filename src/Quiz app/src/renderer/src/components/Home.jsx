import { useState } from "react";
import { animalQuiz, boardGameQuiz, mathQuiz } from "./quizzes";

function Home({ onStart, setQuizType, setQuizName, setMode, setShowPopup, showPopup, setScreen }) {
  return (<>
    <div><h1>Welcome to PLAY A QUIZ OF YOUR CHOICE!</h1></div>
    <div ><button onClick={() => setShowPopup(true)}>Start Quiz</button></div>
    {showPopup && (
        <Popup
          setQuizType={setQuizType}
          setQuizName={setQuizName}
          setMode={setMode}
          setShowPopup={setShowPopup}
          onStart={onStart}

        />
      )}
    <div><button onClick={() => setScreen("highScores")}>View High Scores</button></div>
    <div><button onClick={() => setScreen("gameHistory")}>View Game History</button></div>
    </>)
}

function Popup({ setQuizType, setQuizName, setMode,setShowPopup, onStart }) {
  const [popupScreen, setPopupScreen] = useState(0)
  return (
    <div id = 'popup'>
      {popupScreen === 0 && (
        <div>
          <h3>Quiz Type:</h3>
          <button onClick={() => { setQuizType(mathQuiz); setQuizName("math"); setPopupScreen(1); }}>Math</button>
          <button onClick={() => { setQuizType(animalQuiz); setQuizName("animal"); setPopupScreen(1); }}>Animal Fun Facts</button>
          <button onClick={() => { setQuizType(boardGameQuiz); setQuizName("board game"); setPopupScreen(1); }}>Board Games</button>
        </div>
      )}

      {popupScreen === 1 && (
        <div>
          <h3>Difficulty:</h3>
          <button onClick={() => { setMode("easy"); setShowPopup(false); onStart();}}>Easy</button>
          <button onClick={() => { setMode("hard"); setShowPopup(false); onStart();}}>Hard</button>
        </div>
      )}

      <button onClick={() => setShowPopup(false)}>Close</button>
    </div>
  );
}

export default Home
