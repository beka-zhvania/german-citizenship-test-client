import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedState: '',
    commonQuestionIndices : [],
    stateSpecificQuestionIndices : []
};

const citizenshipTestReducer = createSlice({
    name: 'citizenshipTest',
    initialState,
    reducers: {
        setSelectedState(state, action) {
            state.selectedState = action.payload
        },
        setCommonQuestionIndices(state, action) {
            state.commonQuestionIndices = action.payload
        },
        setStateSpecificQuestionIndices(state, action ){
            state.stateSpecificQuestionIndices = action.payload
        }
    },
});

export const {setSelectedState, setCommonQuestionIndices, setStateSpecificQuestionIndices } = citizenshipTestReducer.actions;

export default citizenshipTestReducer.reducer;
