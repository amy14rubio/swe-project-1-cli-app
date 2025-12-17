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
    <div className="w-screen">
      <h1 className="text-4xl">Game History ⁺⋆ ࿔</h1>

      <div style={{scrollbarWidth: 'none',
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
         WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 11%, black 89%, transparent 100%)",
          maskRepeat: "no-repeat",
          maskSize: "100% 100%",
      }} 
        className="
        text-2xl text-center w-full max-h-[12em] pt-[20px] pb-[10px] 
        overflow-auto flow-root">
        {gameHistory.length > 0 ? (
          <div className="flex p-4">
            {gameHistory.toReversed().map((user, i) => (
              <div className="highlight flex pl-12 pr-12 pt-0 py-2" key={`${user.quizType}-${i}`}>
                {user.score} • {user.quizType} • {user.date}
              </div>
            ))}
          </div>
      ) : (
        <div>No game history yet</div>
      )} </div>


      <button className="text-2xl mt-4" onClick={() => setScreen("home")}>Back home</button>
    </div>
     );
}

export default GameHistory