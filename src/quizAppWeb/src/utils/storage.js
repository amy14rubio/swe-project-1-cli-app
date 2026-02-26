export const readHighscores = () => {
  try {
    const data = localStorage.getItem("highscores")
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export const writeHighscores = (data) => {
  localStorage.setItem("highscores", JSON.stringify(data))
}

export const readGameHistory = () => {
  try {
    const data = localStorage.getItem("gameHistory")
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export const writeGameHistory = (data) => {
  localStorage.setItem("gameHistory", JSON.stringify(data))
}
