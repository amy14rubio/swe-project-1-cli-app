export default function scoreCalc(score, quiz) {
  return (score / quiz.length) * 100;
}