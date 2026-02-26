class GameHistory {
  static gameHistory = [];

  static getGameHistory() {
    return structuredClone(GameHistory.gameHistory);
  }

  static setGameHistory(newGameHistory) {
    if (!newGameHistory || !(newGameHistory instanceof Array)) {
      console.log('Invalid game history. Please provide an array.');
      return;
    }
    GameHistory.gameHistory = newGameHistory;
  }

  static printGameHistory() {
    const gameHistory = GameHistory.gameHistory;

    if (!gameHistory.length) {
      console.log('No games have been played yet.');
      return;
    }

    console.log('Game History ₊⋆ ࿔');
    gameHistory.forEach((game) => console.log(`${game.score} (${game.quizType}) — ${game.date}`));
    console.log(` `);
  }

  static addGame(gameInstance) {
    GameHistory.gameHistory.push(gameInstance);
  }
}

module.exports = GameHistory;
