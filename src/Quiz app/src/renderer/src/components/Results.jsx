import scoreCalc from "../utils/scoreCalc.js";

function Results({ score, setScreen, quizType }) {

  return (<>
    <div><h1>Your Results!</h1></div>
    <div>Score: {score}/{quizType.length} ({scoreCalc(score, quizType)}%)`</div>
    <div>*.✧ Thanks for playing!! ✧.*</div>

    <div ><button onClick={() => setScreen("home")}>Back home</button></div>
    </>)
}

export default Results
