const answerChoices = [
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

const totalQuestions = 10;
let currentScore = 0;
let currentChoices = [];

const scoreCalc = () => (currentScore / totalQuestions) * 100;

const randomizeQuestions = () => {
  answerChoices.sort(() => (Math.random() - 0.5) * 4);
};

const randomizeChoices = (i) => {
  let randomChoices = [...answerChoices[i].choices];
  randomChoices.sort(() => (Math.random() - 0.5) * 4);
  return [
    randomChoices[0],
    randomChoices[1],
    randomChoices[2],
    randomChoices[3],
  ];
};

const printQuestions = (i) => {
  currentChoices = randomizeChoices(i);
  console.log(answerChoices[i].question);
  console.log(`1. ${currentChoices[0]}`);
  console.log(`2. ${currentChoices[1]}`);
  console.log(`3. ${currentChoices[2]}`);
  console.log(`4. ${currentChoices[3]} \n`);
};

const feedback = (i, userAnswer) => {
  userAnswer = currentChoices[userAnswer - 1];
  if (userAnswer === answerChoices[i].choices[3]) {
    console.log(`Congrats "${userAnswer}" is correct!`);
    currentScore++;
    console.log(
      `Current Score: ${currentScore}/${totalQuestions} (${scoreCalc()}%) \n`
    );
  } else {
    console.log(`Incorrect!! \n`);
    console.log(
      `Current Score: ${currentScore}/${totalQuestions} (${scoreCalc()}%) \n`
    );
  }
};

const quizEndMessage = () => {
  console.clear();
  console.log(`The quiz has ended!`);
  console.log(
    `Final Score: ${currentScore}/${totalQuestions} (${scoreCalc()}%)`
  );
  currentScore = 0;
  console.log(`Thanks for playing!! \n`);
};

module.exports = {
  printQuestions,
  feedback,
  quizEndMessage,
  scoreCalc,
  randomizeQuestions,
};
