import React, { useEffect } from 'react'
import Questions from './Question'
import { useSelector, useDispatch } from 'react-redux'
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestions'

export default function CitizenshipTest() {

  const {order, queue} = useSelector(state => state.questions)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(order)
  })



  // next question button event handler
  function onNext(){
    console.log("on next click")
    if (order < queue.length - 1){
      // update question order to next question
      dispatch(MoveNextQuestion())
    }

  }

  // going back to previous question button event handler
  function onBack(){
    console.log("on back click")
    if (order > 0){
      dispatch(MovePrevQuestion())
    }
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
