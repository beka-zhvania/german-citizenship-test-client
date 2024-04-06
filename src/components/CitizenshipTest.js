import React, { useEffect, useState } from 'react'
import Questions from './Questions'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { moveNextQuestion, movePrevQuestion } from '../hooks/FetchQuestions'
import { pushAnswer, updateResultsBulk } from '../hooks/setResult'
import { resetResultAction } from '../redux/result_reducer';
import '../styles/CitizenshipTest.css'; 
import '../styles/page_with_flag.css'


export default function CitizenshipTest() {

  const [selected, setSelected] = useState(undefined);
  const { order, queue, result } = useSelector(state => ({
      order: state.questions.order,
      queue: state.questions.queue,
      result: state.result.result,
  }));
  const [redirectToResult, setRedirectToResult] = useState(false); // Added state for redirection
  const dispatch = useDispatch();
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [timer, setTimer] = useState(3600); // time in seconds for the test duration
  const totalDuration = 3600;

  
  const state = useSelector(state => state)


  // Reset result array when component mounts. dispatch function shouldn't change so this is equivalent to []
  useEffect(() => {
    dispatch(resetResultAction());
  }, [dispatch]);

  // Update progress bar whenever user selects an answer
  useEffect(() => {
    const nonNullResultcount = result.filter(value => value !== null).length
    setProgressBarValue(nonNullResultcount)
  }, [result,selected, order, queue])

  function onSelected(selected) {
    setSelected(selected)
  }

  // Timer logic separated to avoid conflicts and ensure cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 1) {
          clearInterval(interval); // Ensure cleanup
          setRedirectToResult(true); // This will now trigger the redirection in a separate useEffect
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // re-render everything before submitting the answers and also fill in skipped questions
  // without this final re-render the result array might be incomplete at the time of submission
  useEffect(() => {
    if (redirectToResult) {
      fillSkippedQuestions();
    }
  }, [redirectToResult]); // Listening for changes to redirectToResult


  // variables and methods needed for displaying time in a circular countdown
  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  // Calculate stroke-dashoffset for the circular progress
  const strokeDashoffset = ((timer / totalDuration) * 283).toFixed(2); // 283 is the circle's circumference
  // Calculate the percentage of time left
  const timeLeftPercentage = (timer / totalDuration) * 100;
  // Determine the color based on the time left
  const timerColor = timeLeftPercentage <= 20 ? 'red' : 'green';


  // next question button event handler
  function onNext(){
    // handle answer submission or skipping for the current question
    if (result.length <= order ) {
      // if the user selected an answer, push it; otherwise, push a default value 
      dispatch(pushAnswer(selected !== undefined ? selected : null));
    }
    
    // check if it's the last question and prepare for redirection
    if (order === queue.length - 1) {
      // Fill in skipped questions with default values before redirecting
      fillSkippedQuestions();
      setRedirectToResult(true);
    } else {
        // Move to the next question
        dispatch(moveNextQuestion());
    }

      // if answer was not selected, it should be null
    setSelected(null)
    console.log("result", result);//TODO:DELETE

  }

  // going back to previous question button event handler
  function onBack(){
    console.log("on back click")
    if (order > 0){

      // insert new answer to result array
      if (result.length <= order) {
        console.log("in onBack. Calling pushAnswer with " + selected)//TODO:DELETE
        dispatch(pushAnswer(selected))
      }

      // update question order to previous question
      dispatch(movePrevQuestion())
    }
  }

  // fill unanswered elements in results array
  function fillSkippedQuestions() {
    const updatedResults = [...result];
    for (let i = 0; i < queue.length; i++) {
        if (updatedResults[i] === undefined) {
            // push a default value for skipped questions
            updatedResults[i] = null;
        }
    }

    // dispatch an action to update the result array in the store
    dispatch(updateResultsBulk(updatedResults));
  }

   //console.log('state is #', state) //TODO:DELETE
   
  // end of the test when all answers are selected and next button is clicked
  if (redirectToResult ) {
    console.log("state before submitting answers", state)//TODO:DELETE
    return  <Navigate to={'/result'} replace={true}></Navigate>
  }


  // calculate percentage string of progress bar width
  const progressBarWidth = `${(progressBarValue)/queue.length * 100}%`;


  return (
    <>
      <div className="german-flag-section">
          {/* Placeholder for german flag on top of the page */}
      </div>

      <div className="below-flag-section">
        <div className='container'>
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{width: progressBarWidth}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
              {progressBarWidth}
            </div>
          </div>
          <h1 className='title'>Citizenship Test</h1>

          <Questions className='question-component' onSelected={onSelected} />

          <div className='button-container'>
            { order > 0 ? <button className='btn btn-primary back' onClick={onBack}>Back</button> : <div></div>}
            <button className='btn btn-primary next' onClick={onNext}>{order === queue.length - 1 ? "Submit" : "Next"}</button>
          </div>
        </div>

        {/* Circular Timer Display with dynamic color */}
        <div className='timer-display'>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#eee" strokeWidth="10"/>
            <circle cx="50" cy="50" r="45" fill="none" stroke={timerColor} strokeWidth="10"
              strokeDasharray="283" strokeDashoffset={283 - strokeDashoffset} transform="rotate(-90 50 50)"/>
            <text x="50%" y="54%" textAnchor="middle" stroke="#000" strokeWidth="0.5px" dy=".3em">{formatTime()}</text>
          </svg>
        </div>

      </div>
    </>
  );
}
