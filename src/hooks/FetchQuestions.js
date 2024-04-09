import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { startExamination, moveNextAction, movePrevAction } from '../redux/question_reducer';
import { getDataFromDB } from '../util/dataFetcher';

export const useFetchQuestions = (federalState, commonQuestionIndices, stateSpecificQuestionIndices) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({ isLoading: false, questions: [], answers: [], error: null });

    useEffect(() => {
        const fetchData = async () => {

            setData({ ...data, isLoading: true });

            try {

                // fetch state specific and common questions/answers from database
                const [{questions : stateSpecificQuestions}] = await getDataFromDB(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, federalState);
                const [{questions : commonQuestions}] = await getDataFromDB(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, "Common");

                // extract correct answers from the question data and store them in an array
                const stateSpecificAnswers = stateSpecificQuestions.map(question => question.answer);
                const commonAnswers = commonQuestions.map(question => question.answer);

                // filter common questions based on specified indices
                const filteredCommonQuestions = commonQuestionIndices.map(index => commonQuestions[index]);
                const filteredCommonAnswers = commonQuestionIndices.map(index => commonAnswers[index]);

                // filter state specific questions based on specified indices
                const filteredStateSpecificQuestions = stateSpecificQuestionIndices.map(index => stateSpecificQuestions[index]);
                const filteredStateSpecificAnswers = stateSpecificQuestionIndices.map(index => stateSpecificAnswers[index]);

                //Combine the questions and answers
                const combinedQuestions = filteredCommonQuestions.concat(filteredStateSpecificQuestions);
                const combinedAnswers = filteredCommonAnswers.concat(filteredStateSpecificAnswers);

                                if (combinedQuestions.length > 0) {
                    dispatch(startExamination({ questions : combinedQuestions, answers : combinedAnswers }));
                    setData({ isLoading: false, questions: combinedQuestions, answers: combinedAnswers, error: null });
                } else {
                    throw new Error("No questions found.");
                }
            } catch (error) {
                console.log("error occured", error)
                setData({ ...data, isLoading: false, error: error.message });
            }
        };

        fetchData();
    }, [dispatch]);
    //console.log("returning data in FetchQuestions", data)
    return data;
};



export const moveNextQuestion = () => (dispatch) => {
    dispatch(moveNextAction());
};

export const movePrevQuestion = () => (dispatch) => {
    dispatch(movePrevAction());
};
