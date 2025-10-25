const prompt = require("prompt-sync")({ sigint: true });

const { printQuestions, feedback, quizEnd } = require("./quiz.js");
const { printHighScore, highScoreAtQuizEnd } = require("./high-scores.js");

const showMenu = () => {
  let isRunning = true;

  while (isRunning) {
    console.log(
      "Here are your options! \n\
1. Start Quiz \n\
2. View High Scores \n\
3. Exit"
    );

    const menuChoice = prompt("Please choose an option (1-3): ").trim();
    if (menuChoice === "1") {
      console.clear();
      let questionCounter = 0;
      while (questionCounter < 10) {
        printQuestions(questionCounter);
        let answer = prompt(`What's your answer? (1-4): `);
        console.clear();
        feedback(questionCounter, answer);
        questionCounter++;
      }
      let user = prompt(`What's your name?: `);
      highScoreAtQuizEnd(user);
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
