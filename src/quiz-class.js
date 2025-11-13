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
    return [...this.answerChoices[i].choices].sort(
      () => (Math.random() - 0.5) * 2
    );
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
        `Incorrect!! \nScore: ${this.score}/${
          this.answerChoices.length
        } (${this.scoreCalc()}%) \n`
      );
    }
  }
  //prints message at the end of the quiz
  quizEndMessage() {
    console.clear();
    console.log(
      `Final Score: ${this.score}/${
        this.answerChoices.length
      } (${this.scoreCalc()}%)`
    );
    console.log(`*.✧ Thanks for playing!! ✧.*\n`);
    this.score = 0; //resets the score
  }
  static formattedDate() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const year = String(today.getFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
  }
  //array for all user highscores
  static highScore = [
    {
      name: "Player1",
      score: 10,
      date: `10/24/25`,
    },
  ];
  //prints the highscores
  static printHighScore() {
    console.log(`Highscores ₊⋆ ࿔`);
    Quiz.highScore.forEach((user, i) =>
      console.log(`${i + 1}. ${user.score} (${user.name}) — ${user.date}`)
    );
    console.log(` `);
  }
  //determines if user's score is in the top five high scores
  isTopFive() {
    return Quiz.highScore.some((user) => this.scoreCalc() > user.score);
  }
  //places user in the highScore array
  highScoreAtQuizEnd(user) {
    //finds if user already exists in highScore
    const index = Quiz.highScore.findIndex((player) => player.name === user);
    if (index !== -1) {
      //updates user's score if they scored a higher score
      if (this.scoreCalc() > Quiz.highScore[index].score) {
        Quiz.highScore[index].score = this.scoreCalc();
        Quiz.highScore[index].date = Quiz.formattedDate();
      }
    } else {
      //adds user to highScore
      Quiz.highScore.push({
        name: user,
        score: this.scoreCalc(),
        date: Quiz.formattedDate(),
      });
    }

    Quiz.highScore.sort((a, b) => b.score - a.score); //sorts scores
    Quiz.highScore = Quiz.highScore.slice(0, 5); //only allows for top 5 scores in highScore
  }
}

module.exports = Quiz;
