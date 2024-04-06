import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Main.css'; 

export default function Main() {

    const inputRef = useRef(null);
    const [selectedState, setSelectedState] = useState('');
    const navigate = useNavigate();

    const germanStates =["Baden-Württemberg", "Bayern", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hessen", "Mecklenburg-Vorpommern", "Niedersachsen", "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland", "Sachsen", "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen"];
    
    

    const handleStartClick = () => {
        navigate('/CitizenshipTest', { state: { selectedState } });
    }

    return (
        <>
            <div className="german-flag-section">
                {/* Placeholder for image */}
            </div>
            <div className='container'>
                <h1 className='title'>German Citizenship Test Practice</h1>
                <ol>
                    <li>You will be asked 33 questions for German citizenship application</li>
                    <li>Every question has equal weight</li>
                    <li>Every question has a single correct answer</li>
                    <li>Questions can be answered in any order</li>
                </ol>
                
                <select value={selectedState} onChange={e => setSelectedState(e.target.value)} className='state-dropdown'>
                    <option value="">Select a German State</option>
                    {germanStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>

                <div className='start'>
                    <button className='btn' onClick={handleStartClick}>Start Citizenship Test</button>
                </div>
            </div>
        </>
    );
}
