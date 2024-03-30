import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import questionData from '../content/data'

// import redux action used in useDispatch
import * as Actions from '../redux/question_reducer'

// custom hook to fetch question data and set value to store
export const useFetchQuestions = () => {
    const dispatch = useDispatch();
    const [ getData, setGetData ] = useState({isLoading: false, apiData : [], serverError : null})

    useEffect(() => {
        setGetData(prev => ({...prev, isLoading : true}));

        // async function to fetch questions
        (async () => {
            try {
                let questions = await questionData;

                if (questions.length > 0) {
                    setGetData(prev => ({
                        ...prev,
                        isLoading : false,
                        apiData : questions,
                        serverError: null // Reset serverError when data is fetched successfully
                    }));
                    dispatch(Actions.startExamination(questions));
                } else {
                    throw new Error("Question list length is empty.");
                }
            } catch (error) {
                setGetData(prev => ({
                    ...prev,
                    isLoading : false,
                    serverError : error // Update serverError when there's an error
                }));
            }
        })();
    }, [dispatch]);

    return [getData, setGetData]
}

// dispatch function to move to next question
export const MoveNextQuestion = () => async(dispatch) => {
    try {
        dispatch(Actions.moveNextAction()) // increase order of questions by 1
    } catch (error) {
        console.log(error)
    }
}

// dispatch function to move to previous question
export const MovePrevQuestion = () => async(dispatch) => {
    try {
        dispatch(Actions.movePrevAction()) // decrease order of questions by 1
    } catch (error) {
        console.log(error)
    }
}