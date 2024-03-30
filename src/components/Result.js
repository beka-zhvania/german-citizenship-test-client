import React from 'react'
import {Link} from 'react-router-dom'
import ResultTable from './ResultTable'

export default function Result() {


  function onRestart(){
    console.log("restarting the test")
  }

  return (
    <div className='container'>
      <h1 className='title'>Citizenship Test</h1>

      <div className='result'>
      <div>
          <span>Username</span>
          <span>John</span>
        </div>
        <div>
          <span>Correct Answers</span>
          <span>18</span>
        </div>
        <div>
          <span>Total Questions</span>
          <span>33</span>
        </div>
        <div>
          <span>Test Result</span>
          <span>Passed</span>
        </div>
        <div>
          <span>Total Attempts</span>
          <span>5</span>
        </div>
      </div>

      {/* button to restart the test */}
      <div className='start'>
        <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
      </div>

      <div className='container'>
        {/* result table for the test results */}
        <ResultTable></ResultTable>
      </div>
    </div>
  )
}
