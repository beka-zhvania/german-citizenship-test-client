import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

// import custom hook for fetching questions
import { useFetchQuestions } from '../hooks/FetchQuestions'

export default function Questions() {

    const [selectedOption, setSelectedOption] = useState('');
    const [{isLoading, apiData, serverError}] = useFetchQuestions()
    
    // select question from all questions based on the orded specified in the state
    const question  = useSelector(state => state.questions.queue[state.questions.order])

    useEffect(() => {
      console.log("questions is", question)
    })

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
      };


      if (isLoading) return <h3>Questions Are Loading!</h3>
      if (serverError) return <h3>{serverError || "Unknown Error Occured!"} </h3>
      

  return (
    <div className='questions'>
        <h2>{question?.question}</h2>
        
        {/* iterate over each question options and display it as a list*/}
        <ul key={question?.id} style={{ listStyle: 'none' }}>
            
            {
                question?.options.map((q, i) => (
                    <li key={i}>
                        <input 
                        type="radio" 
                        value="option1" 
                        name="options" 
                        id={`q-option-${i}`} 
                        onChange={handleOptionChange}
                        />
                        
                        <label htmlFor={`q-option-${i}`}>{q}</label>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}
