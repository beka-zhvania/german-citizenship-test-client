import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ResultTable from "./ResultTable";
import { resetQuestionsAction } from "../redux/question_reducer";
import { resetResultAction } from "../redux/result_reducer";
import { useDispatch, useSelector } from "react-redux";
import { useStoreResult } from "../hooks/setResult";
import "../styles/page_with_flag.css";
import "../styles/Result.css"

export default function Result() {
  const dispatch = useDispatch();
  const {
    questions: { queue, answers },
    result: { result, userId },
  } = useSelector((state) => state);

  function onRestart() {
    //console.log("restarting the test");
    dispatch(resetQuestionsAction());
    dispatch(resetResultAction());
  }

  // count true values
  const countTrueValues = (arr) => arr.filter(Boolean).length;

  // check for each question if it is answered correctly
  const answerCorrectnessArray = result.map(
    (selectedAnswer, i) => answers[i] === selectedAnswer
  );

  const correctAnswerCount = countTrueValues(answerCorrectnessArray);
  const pass = correctAnswerCount > Math.ceil(queue.length / 2) ? true : false;

  // store result
  useStoreResult({
    username: "test user",
    result: result,
    correctAnswers: correctAnswerCount,
    pass: pass,
  });

  return (
    <>
      <div className="german-flag-section">
        {/* Placeholder for german flag on top of the page */}
      </div>

      <div className="result-container"> 
        <h1 className="result-title">Einbürgerungstest</h1> 

        <div className="result-details"> 
          <div>
            <span>Anzahl der Testfragen</span>
            <span>{result.length}</span>
          </div>
          <div>
            <span>Richtige Antworten</span>
            <span>{correctAnswerCount}</span>
          </div>

          <div>
            <span>Testergebnis</span>
            <span style={{ color: `${pass ? "green" : "red"}` }}>
              {pass ? "Bestanden" : "Nicht Bestanden"}
            </span>
          </div>
        </div>

        <div className="result-restart"> 
          <Link className="result-btn" to={"/"} onClick={onRestart}> 
            Neustart
          </Link>
        </div>


        {/* <ResultTable></ResultTable> */}

      </div>
    </>
  );
}
