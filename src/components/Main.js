import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Main.css'; 
import { useCitizenshipTest } from '../hooks/useCitizenshipTest';
import { grantAccess } from '../redux/access_control_reducer';
import { useDispatch } from 'react-redux';

export default function Main() {

    //const [selectedState, setSelectedState] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const germanStates =["Baden-Württemberg", "Bayern", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hessen", "Mecklenburg-Vorpommern", "Niedersachsen", "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland", "Sachsen", "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen"];
    const { selectedState, updateSelectedState, commonQuestionIndices, updateCommonQuestionIndices, stateSpecificQuestionIndices, updateStateSpecificQuestionIndices } = useCitizenshipTest(); // use custom hook for citizenship test
    

    function generateUniqueIndices(size, max) {
        const indices = new Set(); // Use a Set to ensure uniqueness
        while(indices.size < size) {
          const index = Math.floor(Math.random() * max);
          indices.add(index);
        }
        return [...indices]; // Convert the Set back to an Array
      }
      

    const handleStartClick = () => {

        // grant access to the question page since clicking start button is the correct way for accessing questions
        dispatch(grantAccess());

        // generate indices for random question selection, both for common and state specific questions
        const commonQuestionIndices = generateUniqueIndices(30, 296);
        const stateSpecificQuestionIndices = generateUniqueIndices(3, 8);

        updateCommonQuestionIndices(commonQuestionIndices);
        updateStateSpecificQuestionIndices(stateSpecificQuestionIndices);
        navigate('/CitizenshipTest', { state: { selectedState, commonQuestionIndices, stateSpecificQuestionIndices }});
    }

    return (
        <>
            <div className="german-flag-section">
                {/* Placeholder for image */}
            </div>
            <div className='container'>
                <h1 className='title'>Probetest zum Einbürgerungstest</h1>
                <ol>
                    <li>Es werden Ihnen 33 Fragen gestellt.</li>
                    <li>Sie haben 60 Minuten Zeit, um den Test zu absolvieren.</li>
                    <li>Sie benötigen 17 oder mehr richtige Antworten, um zu bestehen.</li>
                    <li>Jede Frage hat eine einzige richtige Antwort.</li>
                    <li>Die Fragen können in beliebiger Reihenfolge beantwortet werden.</li>
                    <li>Achtung: Dieser Test dient Übungszwecken und könnte Fehler enthalten.</li>
                </ol>

                <label htmlFor="stateDropdown" className="dropdown-label">Bitte wählen Sie das Bundesland</label>
                <select
                id="stateDropdown"
                value={selectedState}
                onChange={e => updateSelectedState(e.target.value)}
                className='state-dropdown'
                >
                    <option value="">Wählen Sie ein Bundesland</option>
                    {germanStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>


                <div className='start'>
                    <button className='btn' onClick={handleStartClick}>Einbürgerungstest Starten</button>
                </div>
            </div>
        </>
    );
}
