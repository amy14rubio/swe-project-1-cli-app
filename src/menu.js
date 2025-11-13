const prompt = require("prompt-sync")({ sigint: true });
const readline = require("readline");

const Quiz = require("./quiz-class.js");
const { mathQuiz, boardQuiz, animalQuiz } = require("./quizzes.js");

let rl;

const createInterface = () => {
  if (rl) rl.close();
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

createInterface(); //creates the readline interface

const ask = (query) => new Promise((resolve) => rl.question(query, resolve));

const runQuiz = async (quizInstance, timeLimit) => {
  quizInstance.randomizeQuestions(); //each quiz starts with random questions
  console.clear();
  let questionCounter = 0;

  while (questionCounter < quizInstance.answerChoices.length) {
    const randomChoiceArr = quizInstance.randomizeChoices(questionCounter);
    quizInstance.printQuestions(questionCounter, randomChoiceArr); //prints quiz questions

    // Only create a timer promise if timer is truthy (e.g. 2000)
    const timerPromise =
      timeLimit != null
        ? new Promise((resolve) =>
            setTimeout(() => resolve("timeout"), timeLimit)
          )
        : null;

    createInterface(); //creates the readline interface

    let answer;

    while (true) {
      const answerPromise = ask(`What's your answer? (1-4): `);
      answer = timerPromise
        ? await Promise.race([timerPromise, answerPromise])
        : await answerPromise;

      if (answer === "timeout") {
        console.clear();
        console.log("⏰ Timer's up!\n");
        quizInstance.feedback(questionCounter, null, randomChoiceArr);
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
      quizInstance.feedback(questionCounter, answer, randomChoiceArr);
      rl.close(); //closes readline interface
      rl = null; //defines rl to avoid bugs
      questionCounter++; //allows next question to be printed
      break; // goes to next question
    }
  }
  if (quizInstance.isTopFive()) {
    let user = prompt(`What's your name?: `);
    quizInstance.highScoreAtQuizEnd(user); //adds user's score to high scores
  }
  quizInstance.quizEndMessage();
};

const showMenu = async () => {
  let isRunning = true;
  while (isRunning === true) {
    console.log("Here are your options!");
    console.log("1. Start Quiz");
    console.log("2. View High Scores");
    console.log("3. Exit \n");

    const menuChoice = prompt("Please choose an option (1-3): ").trim();

    if (menuChoice === "1") {
      console.clear();

      console.log("Here are your quiz options!");
      Quiz.allQuizTypes.forEach((quiz, i) => console.log(`${i + 1}. ${quiz}`));
      console.log(`\nPress any key to exit..`);
      console.log(" ");

      const quizChoice = prompt("Please choose an option (1-3): ").trim();
      const quizzes = [mathQuiz, boardQuiz, animalQuiz];
      const selectedQuiz = quizzes[Number(quizChoice) - 1];
      if (!selectedQuiz) {
        console.clear();
        continue;
      }

      console.clear();
      console.log("HARD mode or EASY mode?");
      console.log("1. Hard");
      console.log("2. Easy");
      console.log(`\nPress any key to exit..`);
      console.log(" ");

      const mode = prompt("Please choose an option (1-2): ").trim();
      const timeLimit = mode === "1" ? 2000 : mode === "2" ? null : undefined;
      timeLimit !== undefined
        ? await runQuiz(selectedQuiz, timeLimit)
        : console.clear();
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
