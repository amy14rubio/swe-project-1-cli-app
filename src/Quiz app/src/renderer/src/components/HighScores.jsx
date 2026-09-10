import { useEffect, useState } from 'react'

function HighScores({ setScreen }) {
  const [highscores, setHighscores] = useState(null)
  useEffect(() => {
    if (window.api?.readHighscores) {
      window.api.readHighscores().then((data) => {
        setHighscores(data || [])
      })
    }
  }, [])

  if (highscores === null) return <div>Loading highscores...</div>

  return (
    <>
      <div className="text-4xl">
        <h1>Highscores ⁺⋆ ࿔</h1>
      </div>
      <div className="text-2xl w-[30ch] break-words text-center">
        {highscores.length > 0 ? (
          <div>
            {highscores.map((user, i) => (
              <div className="highlight w-full flex pl-8 pr-8" key={`${user.date}-${i}`}>
                {i + 1}. {user.name} • {user.score}
                <br />
                {user.quizType} • {user.date}
              </div>
            ))}
          </div>
        ) : (
          <div>No highscores yet</div>
        )}{' '}
      </div>
      <button className="text-2xl mt-4" onClick={() => setScreen('home')}>
        Back home
      </button>
    </>
  )
}

export default HighScores