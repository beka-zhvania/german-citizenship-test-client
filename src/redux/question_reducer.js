import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    queue: [],
    answers: [],
    order: 0,
};

const questionReducer = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        startExamination(state, action) {
            const { questions, answers } = action.payload;
            state.queue = questions;
            state.answers = answers;
        },
        moveNextAction(state) {
            state.order += 1;
        },
        movePrevAction(state) {
            state.order -= 1;
        },
        resetQuestionsAction() {
            return initialState;
        },
    },
});

export const { startExamination, moveNextAction, movePrevAction, resetQuestionsAction } = questionReducer.actions;

export default questionReducer.reducer;
