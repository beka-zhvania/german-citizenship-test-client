import {createSlice} from "@reduxjs/toolkit"

// create a reducer with initial value

const initialState = {
    queue : [],
    answers: [],
    order : 0
}

const questionReducer = createSlice({
    name: 'questions',
    initialState,
    reducers : {
        startExamination : (state, action) => {
            return {
                ...state, 
                queue : action.payload
            }
        }, 
        moveNextAction : (state) => {
            return {
                ...state,
                order : state.order + 1
            }
        },
        movePrevAction : (state) => {
            return {
                ...state,
                order : state.order - 1
            }
        }
    }

})

export const { startExamination, moveNextAction, movePrevAction } = questionReducer.actions

export default questionReducer.reducer