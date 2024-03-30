import {combineReducers, configureStore} from "@reduxjs/toolkit";
import questionReducer  from "./question_reducer";
import resultReducer from "./result_reducer";

// combine reducers as a central store
const rootReducer = combineReducers({
    questions : questionReducer,
    result : resultReducer
})

// create and export store with combined reducer
export default configureStore({ reducer : rootReducer})