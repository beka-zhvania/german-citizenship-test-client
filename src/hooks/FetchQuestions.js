import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { startExamination, moveNextAction, movePrevAction } from '../redux/question_reducer';
import { getDataFromDB } from '../util/dataFetcher';

export const useFetchQuestions = (federalState) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({ isLoading: false, questions: [], answers: [], error: null });

    useEffect(() => {
        const fetchData = async () => {

            setData({ ...data, isLoading: true });

            try {

                // fetch state specific questions/answers from database
                const [{questions : stateSpecificQuestions, answers : stateSpecificAnswers}] = await getDataFromDB(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, federalState);
                
                // fetch common questions/answers from database
                const [{questions : commonQuestions, answers : commonAnswers}] = await getDataFromDB(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, "Common");

                //Combine the questions and answers
                const combinedQuestions = commonQuestions.concat(stateSpecificQuestions);
                const combinedAnswers = commonAnswers.concat(stateSpecificAnswers);

                if (combinedQuestions.length > 0) {
                    dispatch(startExamination({ questions : combinedQuestions, answers : combinedAnswers }));
                    setData({ isLoading: false, questions: combinedQuestions, answers: combinedAnswers, error: null });
                } else {
                    throw new Error("No questions found.");
                }
            } catch (error) {
                setData({ ...data, isLoading: false, error: error.message });
            }
        };

        fetchData();
    }, [dispatch]);
    console.log("returning data in FetchQuestions", data)
    return data;
};



export const moveNextQuestion = () => (dispatch) => {
    dispatch(moveNextAction());
};

export const movePrevQuestion = () => (dispatch) => {
    dispatch(movePrevAction());
};
