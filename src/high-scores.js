const { scoreCalc, quizEndMessage } = require("./quiz.js");

let highScore = [
  {
    name: "Player1",
    score: 10,
    date: `10/24/25`,
  },
];

const formattedDate = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const year = String(today.getFullYear()).slice(-2);
  return `${month}/${day}/${year}`;
};

const printHighScore = () => {
  console.log(`Highscores:`);
  for (user of highScore) {
    const index = highScore.findIndex((player) => player.name === user.name);
    console.log(`${index + 1}. ${user.score} (${user.name}) — ${user.date}`);
  }
  console.log(`\n`);
};

const isTopFive = () => highScore.some((user) => scoreCalc() > user.score);

const highScoreAtQuizEnd = (user) => {
  const index = highScore.findIndex((player) => player.name === user);
  if (index !== -1) {
    if (scoreCalc() > highScore[index].score) {
      highScore[index].score = scoreCalc();
      highScore[index].date = formattedDate();
    }
  } else {
    highScore.push({
      name: user,
      score: scoreCalc(),
      date: formattedDate(),
    });
  }

  highScore.sort((a, b) => b.score - a.score);
  highScore = highScore.slice(0, 5);
};

module.exports = { printHighScore, highScoreAtQuizEnd, isTopFive };
