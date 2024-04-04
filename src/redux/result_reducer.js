import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    result: [],
};

const resultReducer = createSlice({
    name: 'result',
    initialState,
    reducers: {
        setUserId(state, action) {
            state.userId = action.payload;
        },
        pushAnswerAction(state, action) {
            state.result.push(action.payload);
        },
        updateResultAction(state, action) {
            const { order, selectedOption } = action.payload;
            state.result[order] = selectedOption;
        },
        resetResultAction() {
            return initialState;
        },
        // reducer action for updating entire result array
        updateResultsBulkAction(state, action) {
            state.result = action.payload;
        },
    },
});

export const { setUserId, pushAnswerAction, updateResultAction, resetResultAction, updateResultsBulkAction } = resultReducer.actions;

export default resultReducer.reducer;
