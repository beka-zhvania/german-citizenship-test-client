import React, { useEffect } from 'react'
import { useState } from 'react'
import questions from '../content/data';

export default function Questions() {

    const [selectedOption, setSelectedOption] = useState('');

   
    const question = questions[0] // TODO: handle all questions instead of taking 1st
    useEffect(() => {
        console.log(question)
        console.log("question.id", question.id)
    })
    

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
      };

      

  return (
    <div className='questions'>
        <h2>{question.question}</h2>
        
        {/* iterate over each question options and display it as a list*/}
        <ul key={question.id} style={{ listStyle: 'none' }}>
            
            {
                question.options.map((q, i) => (
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
