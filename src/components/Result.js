import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import ResultTable from './ResultTable'
import { resetQuestionsAction } from '../redux/question_reducer'
import { resetResultAction } from '../redux/result_reducer'
import { useDispatch, useSelector } from 'react-redux'
import { useStoreResult } from '../hooks/setResult'


export default function Result() {

  const dispatch = useDispatch()
  const {questions : {queue, answers}, result : {result, userId}} = useSelector(state => state)

  function onRestart(){
    console.log("restarting the test")
    dispatch(resetQuestionsAction())
    dispatch(resetResultAction())
  }



  // calculate if test is passed
  const countTrueValues = arr => arr.filter(Boolean).length;
  function calculateResult(){
    const correctAnswers = result.map((selectedAnswer, i) => answers[i] === selectedAnswer)
    return (countTrueValues(correctAnswers) > 3 ? true : false)
  }
  const testResult = calculateResult()
  console.log("result is" ,testResult)//TODO:DELETE
  
  console.log("printing result", result)//TODO:DELETE
  // store result
  useStoreResult({username : "test user", result : result, correctanswers : testResult})

  return (
    <div className='container'>
      <h1 className='title'>Citizenship Test</h1>

      <div className='result'>
      <div>
          <span>Username</span>
          <span>test user</span>
        </div>
        <div>
          <span>Correct Answers</span>
          <span>{calculateResult()}</span>
        </div>
        <div>
          <span>Total Questions</span>
          <span>{result.length}</span>
        </div>
        <div>
          <span>Test Result</span>
          <span style={{color : `${testResult ? "green" : "red"}`}}>{testResult ? "Passed" : "Failed"}</span>
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
  )
}
