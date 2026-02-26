const GameHistory = require('./GameHistory.js');
const Highscores = require('./Highscores.js');

class Quiz {
  static allQuizTypes = [];

  constructor(quizType, answerChoices) {
    this.quizType = quizType;
    this.answerChoices = answerChoices;
    this.score = 0;
    Quiz.allQuizTypes.push(quizType);
  }
  scoreCalc() {
    return (this.score / this.answerChoices.length) * 100;
  }
  //randomizes the questions mutating the original array
  randomizeQuestions() {
    this.answerChoices.sort(() => (Math.random() - 0.5) * 2);
  }
  //randomizes the choices without mutating the original array
  randomizeChoices(i) {
    return [...this.answerChoices[i].choices].sort(() => (Math.random() - 0.5) * 2);
  }
  printQuestions(i, randomChoiceArr) {
    console.log(this.answerChoices[i].question);
    randomChoiceArr.forEach((el, index) => console.log(`${index + 1}. ${el}`));
    console.log(` `);
  }
  //checks if the user answered correctly or incorrectly
  feedback(i, answer, randomChoiceArr) {
    const userAnswer = randomChoiceArr[answer - 1];
    if (userAnswer === this.answerChoices[i].choices[3]) {
      this.score++; //increases the score if user answers correctly
      console.log(
        `"${userAnswer}" is correct! \nScore: ${this.score}/${
          this.answerChoices.length
        } (${this.scoreCalc()}%) \n`
      );
    } else {
      console.log(
        `Incorrect!! \nScore: ${this.score}/${this.answerChoices.length} (${this.scoreCalc()}%) \n`
      );
    }
  }
  //prints message at the end of the quiz
  quizEndMessage() {
    console.clear();
    console.log(`Final Score: ${this.score}/${this.answerChoices.length} (${this.scoreCalc()}%)`);
    console.log(`*.✧ Thanks for playing!! ✧.*\n`);

    GameHistory.addGame({
      quizType: this.quizType,
      score: this.scoreCalc(),
      date: Quiz.formattedDate(),
    });

    this.score = 0; //resets the score
  }
  static formattedDate() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = String(today.getFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
  }

  //determines if user's score is in the top five high scores
  isTopFive() {
    return Highscores.highscore.some((user) => this.scoreCalc() > user.score);
  }
  //places user in the highScore array
  highScoreAtQuizEnd(user) {
    //finds if user already exists in highScore
    const index = Highscores.highscore.findIndex((player) => player.name === user);
    if (index !== -1) {
      //updates user's score if they scored a higher score
      if (this.scoreCalc() > Highscores.highscore[index].score) {
        Highscores.highscore[index].score = this.scoreCalc();
        Highscores.highscore[index].date = Quiz.formattedDate();
      }
    } else {
      //adds user to highScore
      Highscores.addGame({
        name: user,
        quizType: this.quizType,
        score: this.scoreCalc(),
        date: Quiz.formattedDate(),
      });
    }

    Highscores.highscore.sort((a, b) => b.score - a.score); //sorts scores
    Highscores.highscore = Highscores.highscore.slice(0, 5); //only allows for top 5 scores in highScore
  }
}

module.exports = Quiz;
