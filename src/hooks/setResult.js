import * as Action from '../redux/result_reducer'
import { postDataToDB } from '../util/dataFetcher'

export const pushAnswer = (result) => async (dispatch) => {
    try {
        await dispatch(Action.pushAnswerAction(result))
    } catch (error) {
        console.log(error)
    }
}

export const updateResult = (order, selectedOption) => async (dispatch) => {
    try {
        dispatch(Action.updateResultAction(order, selectedOption))
    } catch (error) {
        console.log(error)
    }
}

// function for bulk-updating the results
export const updateResultsBulk = (results) => async (dispatch) => {
    try {
        await dispatch(Action.updateResultsBulkAction(results));
    } catch (error) {
        console.log(error);
    }
};

// custom hook to insert user result data
export const useStoreResult = (resultData) => {

    const { result, username } = resultData;
    console.log("result", result);//TODO:DELETE
    console.log("resultData.result", resultData.result);
    console.log("result != []", result != []);
    (async () => {
        try {
            if (result.length === 0) {
                throw new Error("No Result Available!")
            }
            // store result data to database and return it
            await postDataToDB(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`, resultData)
            return resultData
        } catch (err) {
            console.log(err)
        }
    })()
}