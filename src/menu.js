const prompt = require("prompt-sync")({ sigint: true });
const readline = require("readline");

let rl;

const createInterface = () => {
  if (rl) rl.close();
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

createInterface();

const ask = (query) => new Promise((resolve) => rl.question(query, resolve));

const Quiz = require("./quiz-class.js");
const mathQuiz = require("./quizzes.js");

const showMenu = async () => {
  let isRunning = true;
  while (isRunning === true) {
    console.log("Here are your options!");
    console.log("1. Start Quiz");
    console.log("2. View High Scores");
    console.log("3. Exit \n");

    const menuChoice = prompt("Please choose an option (1-3): ").trim();

    if (menuChoice === "1") {
      mathQuiz.randomizeQuestions(); //each quiz starts with random questions
      console.clear();
      let questionCounter = 0;
      let score = 0;

      while (questionCounter < 10) {
        const randomChoiceArr = mathQuiz.randomizeChoices(questionCounter);
        mathQuiz.printQuestions(questionCounter, randomChoiceArr); //prints quiz questions

        //sets a timer
        const timerPromise = new Promise((resolve) => {
          setTimeout(() => resolve("timeout"), 5000);
        });

        createInterface(); //creates the readline interface

        let answer;

        while (true) {
          const answerPromise = ask(`What's your answer? (1-4): `);
          answer = await Promise.race([timerPromise, answerPromise]);

          if (answer === "timeout") {
            console.clear();
            console.log("⏰ Timer's up!\n");
            score = mathQuiz.feedback(
              questionCounter,
              null,
              randomChoiceArr,
              score
            );
            rl.close(); //closes readline interface
            rl = null; //defines rl to avoid bugs
            questionCounter++; //allows next question to be printed
            break; // goes to next question
          }

          // validates input
          if (!["1", "2", "3", "4"].includes(answer)) {
            console.log(`Invalid answer. Try again.\n`);
            continue; // retries same question
          }

          // valid answer
          console.clear();
          score = mathQuiz.feedback(
            questionCounter,
            answer,
            randomChoiceArr,
            score
          );
          rl.close(); //closes readline interface
          rl = null; //defines rl to avoid bugs
          questionCounter++; //allows next question to be printed
          break; // goes to next question
        }
      }
      if (mathQuiz.isTopFive()) {
        let user = prompt(`What's your name?: `);
        mathQuiz.highScoreAtQuizEnd(user); //adds user's score to high scores
      }
      mathQuiz.quizEndMessage();
    } else if (menuChoice === "2") {
      console.clear();
      Quiz.printHighScore();
    } else if (menuChoice === "3") {
      createInterface();
      rl.close();
      isRunning = false;
      console.log("Bye bye ❤︎");
    } else {
      console.clear();
      console.log("Invalid option, try again.\n");
    }
  }
};

module.exports = { showMenu };
