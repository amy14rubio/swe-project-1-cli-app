import Home from './components/Home'
import Quiz from './components/Quiz'
import Results from './components/Results'
import HighScores from './components/HighScores.jsx'
import GameHistory from './components/GameHistory.jsx'

import { useState } from 'react'

function App() {
  const [screen, setScreen] = useState('home');
  const [mode, setMode] = useState("");
  const [quizType, setQuizType] = useState([]);
  const [quizName, setQuizName]= useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [score, setScore] = useState(0);
  const [counter, setCounter] = useState(0);
  const [questions, setQuestions] = useState([]);  

  const startGame = () => {
    const randomizeChoices = quizType.map((q) => 
      ({
        ...q,
        choices: q.choices.toSorted(() => (Math.random() - 0.5) * 2)
      })
    ).toSorted(() => (Math.random() - 0.5) * 2);
    setCounter(0);
    setScore(0);
    setQuestions(randomizeChoices);
    setScreen("quiz");
  };
  return (<>
  {screen == 'home' && <Home onStart={startGame} setQuizType={setQuizType} setQuizName={setQuizName} setMode={setMode} setShowPopup={setShowPopup} showPopup={showPopup} setScreen={setScreen}/>}
  {screen == 'quiz' && <Quiz mode={mode} quizType={quizType} quizName={quizName} counter={counter} setCounter={setCounter} questions={questions} score={score} setScore={setScore} setScreen={setScreen}/>}
  {screen == 'results' && <Results score={score} setScreen={setScreen} quizType={quizType}/>}
  {screen == 'highScores' && <HighScores setScreen={setScreen} />}
  {screen == 'gameHistory' && <GameHistory setScreen={setScreen} />}
  </>)
}

export default App
