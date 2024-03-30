import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    userId: null,
    result: [],
}

const resultReducer = createSlice({
    name: 'result',
    initialState,
    reducers : {
        setUserId : (state, action) => {
            state.userId = action.payload
        }
    }
})

export const { setUserId } = resultReducer.actions

export default resultReducer.reducer