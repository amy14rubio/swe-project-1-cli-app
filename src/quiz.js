const answerChoices = [
  {
    question: `How many words for “snow” does Scotland have?`,
    choices: [`50`, `100`, `900`, `421`],
  },
  {
    question: `What food never spoils, even after thousands of years?`,
    choices: [`Salt`, `Rice`, `Vinegar`, `Honey`],
  },
  {
    question: `Which of these fruits is actually a berry?`,
    choices: [`Strawberry`, `Raspberry`, `Blueberry`, `Banana`],
  },
  {
    question: `What animal’s fingerprints are so similar to humans’ they can confuse crime scene investigators?`,
    choices: [`Raccoon`, `Monkey`, `Panda`, `Koala`],
  },
  {
    question: `What animal can sleep for up to three years?`,
    choices: [`Bear`, `Sloth`, `Snake`, `Snail`],
  },
  {
    question: `What food item was once used as currency in ancient civilizations?`,
    choices: [`Tea`, `Rice`, `Sugar`, `Cocoa beans`],
  },
  {
    question: `How long is the longest song ever written?`,
    choices: [`100 years`, `500 years`, `5 years`, `1,000 years`],
  },
  {
    question: `What is the only king in a standard deck of cards without a mustache?`,
    choices: [
      `King of Diamonds`,
      `King of Spades`,
      `King of Clubs`,
      `King of Hearts`,
    ],
  },
  {
    question: `What is the most sold board game of all time?`,
    choices: [`Scrabble`, `Chess`, `Checkers`, `Monopoly`],
  },
  {
    question: `Which board game was originally created to teach children about the dangers of capitalism?`,
    choices: [`The Game of Life`, `Backgammon`, `Sorry!`, `Monopoly`],
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
  }
};

const quizEndMessage = () => {
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
