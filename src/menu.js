const prompt = require("prompt-sync")({ sigint: true });

const {
  printQuestions,
  feedback,
  quizEndMessage,
  randomizeQuestions,
} = require("./quiz.js");
const {
  printHighScore,
  highScoreAtQuizEnd,
  isTopFive,
} = require("./high-scores.js");

const showMenu = () => {
  let isRunning = true;

  while (isRunning) {
    console.log("Here are your options!");
    console.log("1. Start Quiz");
    console.log("2. View High Scores");
    console.log("3. Exit \n");

    const menuChoice = prompt("Please choose an option (1-3): ").trim();
    if (menuChoice === "1") {
      randomizeQuestions();
      console.clear();
      let questionCounter = 0;
      while (questionCounter < 10) {
        printQuestions(questionCounter);
        let answer = prompt(`What's your answer? (1-4): `);
        console.clear();
        feedback(questionCounter, answer);
        questionCounter++;
      }
      if (isTopFive()) {
        let user = prompt(`What's your name?: `);
        highScoreAtQuizEnd(user);
      }
      quizEndMessage();
    } else if (menuChoice === "2") {
      console.clear();
      printHighScore();
    } else if (menuChoice === "3") {
      isRunning = false;
    } else {
      console.log("Invalid option, try again.");
    }
  }
};
module.exports = { showMenu };
