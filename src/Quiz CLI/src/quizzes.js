const Quiz = require('./Quiz.js');

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

const boardGameQuizChoices = [
  {
    question: `In Monopoly, which property is the most expensive?`,
    choices: [`Park Place`, `Marvin Gardens`, `Baltic Avenue`, `Boardwalk`],
  },
  {
    question: `In Chess, which piece can only move diagonally?`,
    choices: [`Knight`, `Rook`, `Queen`, `Bishop`],
  },
  {
    question: `In Connect Four, how many in a row do you need to win?`,
    choices: [`3`, `5`, `6`, `4`],
  },
  {
    question: `In Chess, what move involves the king and a rook?`,
    choices: [`Promotion`, `En passant`, `Checkmate`, `Castling`],
  },
  {
    question: `In Codenames, what are players trying to identify?`,
    choices: [`Movie titles`, `Colors`, `Numbers`, `Words`],
  },
  {
    question: `In Sorry!, how many pawns does each player start with?`,
    choices: [`2`, `3`, `6`, `4`],
  },
  {
    question: `What is the only king in a standard deck of cards without a mustache?`,
    choices: [`King of Diamonds`, `King of Spades`, `King of Clubs`, `King of Hearts`],
  },
  {
    question: `In Uno, which card can reverse the order of play?`,
    choices: [`Skip`, `Draw Two`, `Wild`, `Reverse`],
  },
  {
    question: `What is the most sold board game of all time?`,
    choices: [`Scrabble`, `Chess`, `Checkers`, `Monopoly`],
  },
  {
    question: `In Jenga, how many wooden blocks are used to build the tower?`,
    choices: [`48`, `60`, `45`, `54`],
  },
];

const animalFunFactsQuizChoices = [
  {
    question: `What animal’s fingerprints are so similar to humans’ they can confuse crime scene investigators?`,
    choices: [`Raccoon`, `Monkey`, `Panda`, `Koala`],
  },
  {
    question: `What animal can sleep for up to three years?`,
    choices: [`Bear`, `Sloth`, `Snake`, `Snail`],
  },
  {
    question: `What is the only animal that cannot jump?`,
    choices: [`Elephant Seal`, `Crocodile`, `Hippopotamus`, `Elephant`],
  },
  {
    question: `What is the only mammal capable of true flight?`,
    choices: [`Flying Squirrel`, `Gliding Possum`, `Bird`, `Bat`],
  },
  {
    question: `What animal can survive both on land and in water?`,
    choices: [`Seal`, `Otter`, `Duck`, `Frog`],
  },
  {
    question: `Which animal is known to have three hearts?`,
    choices: [`Starfish`, `Jellyfish`, `Squid`, `Octopus`],
  },
  {
    question: `Which bird can fly backward?`,
    choices: [`Eagle`, `Pigeon`, `Parrot`, `Hummingbird`],
  },
  {
    question: `Which animal can sleep while standing up?`,
    choices: [`Dog`, `Tiger`, `Elephant`, `Horse`],
  },
  {
    question: `What is the fastest land animal in the world?`,
    choices: [`Lion`, `Horse`, `Greyhound`, `Cheetah`],
  },
  {
    question: `Which animal can regenerate lost limbs?`,
    choices: [`Lizard`, `Crab`, `Frog`, `Starfish`],
  },
];

const mathQuiz = new Quiz('Math', mathQuizChoices);
const boardQuiz = new Quiz('Board game', boardGameQuizChoices);
const animalQuiz = new Quiz('Animal fun facts', animalFunFactsQuizChoices);

module.exports = { mathQuiz, boardQuiz, animalQuiz };
