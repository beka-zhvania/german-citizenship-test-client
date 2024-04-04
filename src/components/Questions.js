import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import custom hook for fetching questions
import { useFetchQuestions } from '../hooks/FetchQuestions'
import { updateResult } from '../hooks/setResult'

import '../styles/Questions.css'

export default function Questions({ onSelected }) {

    const dispatch = useDispatch()
    const { order } =  useSelector(state => state.questions)
    const resultArray = useSelector(state => state.result.result)
    const {questions } = useFetchQuestions();
    const state = useSelector(state => state)
    let answerToDisplaySelected = resultArray.length > order ? resultArray[order] : '';
    const [selectedOption, setSelectedOption] = useState(answerToDisplaySelected);
    
    // select question from all questions based on the orded specified in the state
    //const question  = useSelector(state => state.questions.queue[state.questions.order])
    const question = questions[order]

    
    useEffect(() => {

        //console.log("state is ", state, "question is ", question, "order is ", order)
     // update selected answer based on question number/order and user selection
     dispatch(updateResult({order, selectedOption}))
     //console.log(state)
    },[ selectedOption])


    const handleOptionChange = (i) => {
        onSelected(i)
        setSelectedOption(i)
        dispatch(updateResult({order, selectedOption}))
      };

      
    return (
        <div className="container mt-sm-2 my-1">

            <div className="question ml-sm-5 pl-sm-5 pt-2">
                <div className="py-2 question-text"><b>Q. {question?.question}</b></div>
                <div className="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                    {question?.options.map((option, i) => (
                        <label className="options" key={i}>
                            {option}
                            <input 
                                type="radio" 
                                name="radio" 
                                onChange={() => handleOptionChange(i)} 
                                checked={resultArray[order] === i} 
                            />
                            <span className="checkmark"></span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
      
}
