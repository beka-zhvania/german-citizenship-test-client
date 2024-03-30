import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

export default function Main() {

    const inputRef = useRef(null)

  return (
    <div className='container'>
        <h1 className='title'>Citizenship Test</h1>

        <ol>
            <li>You will be asked 33 questions for German citizenship application.</li>
            <li>Every question has equal weight.</li>
            <li>Every question has a single correct answer.</li>
            <li>Questions can be answered in any order.</li>
        </ol>

        <form id="form">
            <input ref={inputRef} type="text" placeholder="Username" />
        </form>

        <div className='start'>
            {/* when user clicks link they should be navigated to citizenship test */}
            <Link className='btn' to={"CitizenshipTest"}>Start Citizenship Test</Link>
        </div>
    
    </div>
  )
}
