import { useEffect, useState } from "react";

function HighScores({ setScreen }) {
const [highscores, setHighscores] = useState(null);
  useEffect(() => {
  if (window.api?.readHighscores) {
    window.api.readHighscores().then((data) => {
      setHighscores(data || []);
    });
  }
  
}, []);

  if (highscores === null) return <div>Loading highscores...</div>;


  return (
    <>
      <h1>Highscores ⁺⋆ ࿔</h1>
      <div>{highscores.length > 0 ? (
        <div>
          {highscores.map((user, i) => (
            <div key={`${user.date}-${i}`}>
              {i + 1}. {user.score} ({user.name}) — {user.quizType} — {user.date}
            </div>
          ))}
        </div>
      ) : (
        <div>No highscores yet</div>
      )} </div>
      <button onClick={() => setScreen("home")}>Back home</button>
    </>
     );
}

export default HighScores