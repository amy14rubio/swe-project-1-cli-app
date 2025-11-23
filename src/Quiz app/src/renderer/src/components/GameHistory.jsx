import { useEffect, useState } from "react";

function GameHistory({ setScreen }) {
const [gameHistory, setGameHistory] = useState(null);
  useEffect(() => {
  if (window.api?.readGameHistory) {
    window.api.readGameHistory().then((data) => {
      setGameHistory(data || []);
    });
  }
  
}, []);

  if (gameHistory === null) return <div>Loading game history...</div>;

  return (
    <>
      <h1>Game History ⁺⋆ ࿔</h1>
      <div>{gameHistory.length > 0 ? (
        <div>
          {gameHistory.map((user, i) => (
            <div key={`${user.quizType}-${i}`}>
              {user.date} — {user.quizType} — {user.score}
            </div>
          ))}
        </div>
      ) : (
        <div>No game history yet</div>
      )} </div>
      <button onClick={() => setScreen("home")}>Back home</button>
    </>
     );
}

export default GameHistory