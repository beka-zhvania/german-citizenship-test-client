import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { startExamination, moveNextAction, movePrevAction } from '../redux/question_reducer';
import { getDataFromDB } from '../util/dataFetcher';

export const useFetchQuestions = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({ isLoading: false, questions: [], answers: [], error: null });

    useEffect(() => {
        const fetchData = async () => {
            setData({ ...data, isLoading: true });
            try {

                // fetch questions and answers from the database 
                const [{questions, answers}] = await getDataFromDB(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`);
                if (questions.length > 0) {
                    dispatch(startExamination({ questions, answers }));
                    setData({ ...data, isLoading: false, questions, answers });
                } else {
                    throw new Error("No questions found.");
                }
            } catch (error) {
                setData({ ...data, isLoading: false, error: error.message });
            }
        };

        fetchData();
    }, [dispatch]);
    //console.log("returning data in FetchQuestions.js", data)//TODO:DELETE
    return data;
};

export const moveNextQuestion = () => (dispatch) => {
    dispatch(moveNextAction());
};

export const movePrevQuestion = () => (dispatch) => {
    dispatch(movePrevAction());
};
