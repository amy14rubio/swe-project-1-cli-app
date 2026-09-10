class Highscores {
  static highscore = [];

  static getHighscoreHistory() {
    return structuredClone(Highscores.highscore);
  }

  static setHighscoreHistory(newGameHistory) {
    if (!newGameHistory || !(newGameHistory instanceof Array)) {
      console.log('Invalid game history. Please provide an array.');
      return;
    }

    Highscores.highscore = newGameHistory;
  }
  //prints the highscores
  static printHighScore() {
    console.log(`Highscores ₊⋆ ࿔`);
    Highscores.highscore.forEach((user, i) =>
      console.log(`${i + 1}. ${user.score} (${user.name}) — ${user.date}`)
    );
    console.log(` `);
  }

  static addGame(gameInstance) {
    Highscores.highscore.push(gameInstance);
  }
}

module.exports = Highscores;
