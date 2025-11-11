class Quiz {
  constructor(quizType, answerChoices) {
    this.quizType = quizType;
    this.answerChoices = answerChoices;
    this.score = 0;
  }
  scoreCalc() {
    return (this.score / this.answerChoices.length) * 100;
  }

  randomizeQuestions() {
    this.answerChoices.sort(() => (Math.random() - 0.5) * 2);
  }

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

  feedback(i, answer, randomChoiceArr) {
    const userAnswer = randomChoiceArr[answer - 1];
    if (userAnswer === this.answerChoices[i].choices[3]) {
      console.log(`"${userAnswer}" is correct!`);
      this.score++;
      console.log(
        `Score: ${this.score}/${
          this.answerChoices.length
        } (${this.scoreCalc()}%) \n`
      );
    } else {
      console.log(`Incorrect!!`);
      console.log(
        `Score: ${this.score}/${
          this.answerChoices.length
        } (${this.scoreCalc()}%) \n`
      );
    }

    return this.score;
  }

  quizEndMessage() {
    console.clear();
    console.log(
      `Final Score: ${this.score}/${
        this.answerChoices.length
      } (${this.scoreCalc()}%)`
    );
    console.log(`*.✧ Thanks for playing!! ✧.*\n`);
  }

  static formattedDate() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const year = String(today.getFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
  }

  static highScore = [
    {
      name: "Player1",
      score: 10,
      date: `10/24/25`,
    },
  ];

  static printHighScore() {
    console.log(`Highscores ₊⋆ ࿔`);
    Quiz.highScore.forEach((user, i) =>
      console.log(`${i + 1}. ${user.score} (${user.name}) — ${user.date}`)
    );
    console.log(` `);
  }

  isTopFive() {
    return Quiz.highScore.some((user) => this.scoreCalc() > user.score);
  }

  highScoreAtQuizEnd(user) {
    const index = Quiz.highScore.findIndex((player) => player.name === user);

    if (index !== -1) {
      if (this.scoreCalc() > Quiz.highScore[index].score) {
        Quiz.highScore[index].score = this.scoreCalc();
        Quiz.highScore[index].date = Quiz.formattedDate();
      }
    } else {
      Quiz.highScore.push({
        name: user,
        score: this.scoreCalc(),
        date: Quiz.formattedDate(),
      });
    }

    Quiz.highScore.sort((a, b) => b.score - a.score);
    Quiz.highScore = Quiz.highScore.slice(0, 5);
  }
}

module.exports = Quiz;
