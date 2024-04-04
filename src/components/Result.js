import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import ResultTable from './ResultTable'
import { resetQuestionsAction } from '../redux/question_reducer'
import { resetResultAction } from '../redux/result_reducer'
import { useDispatch, useSelector } from 'react-redux'
import { useStoreResult } from '../hooks/setResult'
import '../styles/page_with_flag.css'

export default function Result() {

  const dispatch = useDispatch()
  const {questions : {queue, answers}, result : {result, userId}} = useSelector(state => state)

  function onRestart(){
    console.log("restarting the test")
    dispatch(resetQuestionsAction())
    dispatch(resetResultAction())
  }



  // caunt true values
  const countTrueValues = arr => arr.filter(Boolean).length;

  // check for each question if it is answered correctly
  const answerCorrectnessArray = result.map((selectedAnswer, i) => answers[i] === selectedAnswer)


  const correctAnswerCount = countTrueValues(answerCorrectnessArray)
  const pass = correctAnswerCount > Math.ceil(queue.length/2) ? true : false
  

  console.log("correctAnswersArray", correctAnswerCount, "resultBoolean",pass)
  // store result
  useStoreResult({username : "test user", result : result, correctAnswers : correctAnswerCount, pass : pass})


  return (
    <>
      <div className="german-flag-section">
        {/* Placeholder for german flag on top of the page */}
      </div>

      <div className='container'>
        <h1 className='title'>Citizenship Test</h1>

        <div className='result'>
        <div>
            <span>Username</span>
            <span>test user</span>
          </div>
          <div>
            <span>Correct Answers</span>
            <span>{correctAnswerCount}</span>
          </div>
          <div>
            <span>Total Questions</span>
            <span>{result.length}</span>
          </div>
          <div>
            <span>Test Result</span>
            <span style={{color : `${pass ? "green" : "red"}`}}>{pass ? "Passed" : "Failed"}</span>
          </div>

        </div>

        {/* button to restart the test */}
        <div className='start'>
          <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
        </div>

        <div className='container'>
          {/* result table for the test results */}
          {/* <ResultTable></ResultTable> */}
        </div>
      </div>
    </>
  )
}
