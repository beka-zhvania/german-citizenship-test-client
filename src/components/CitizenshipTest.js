import React from 'react'
import Questions from './Questions'

export default function CitizenshipTest() {

  // next question button event handler
  function onNext(){
    console.log("on next click")
  }

  // going back to previous question button event handler
  function onBack(){
    console.log("on back click")
  }

  return (
      <div className='container'>
        <h1 className='title'>Citizenship Test</h1>

        <Questions/>

        <div className='grid'>
          <button className='btn back' onClick={onBack}>Back</button>
          <button className='btn next' onClick={onNext}>Next</button>
        </div>
      </div>
  )
}
