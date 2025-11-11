const Quiz = require("./quiz-class.js");

const mathQuizChoices = [
  {
    question: `What is 5 + 3?`,
    choices: [`6`, `7`, `9`, `8`],
  },
  {
    question: `What is 10 - 4?`,
    choices: [`5`, `8`, `7`, `6`],
  },
  {
    question: `What is 7 × 2?`,
    choices: [`12`, `13`, `15`, `14`],
  },
  {
    question: `What is 16 ÷ 4?`,
    choices: [`3`, `6`, `5`, `4`],
  },
  {
    question: `What is 9 + 6?`,
    choices: [`14`, `13`, `16`, `15`],
  },
  {
    question: `What is 12 - 5?`,
    choices: [`6`, `8`, `9`, `7`],
  },
  {
    question: `What is 3 × 5?`,
    choices: [`12`, `13`, `14`, `15`],
  },
  {
    question: `What is 20 ÷ 5`,
    choices: [`3`, `5`, `6`, `4`],
  },
  {
    question: `What is 8 + 7?`,
    choices: [`14`, `16`, `13`, `15`],
  },
  {
    question: `What is 15 - 9?`,
    choices: [`5`, `7`, `8`, `6`],
  },
];

const mathQuiz = new Quiz("math", mathQuizChoices);

module.exports = mathQuiz;
