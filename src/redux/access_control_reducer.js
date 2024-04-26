import { createSlice } from '@reduxjs/toolkit';

// this reducer is used to control when the test question page should be displayed. Namely it should be accessible from the main page by clicking start button
export const accessControlReducer = createSlice({
  name: 'accessControl',
  initialState: {
    hasAccess: false,
  },
  reducers: {
    grantAccess: (state) => {
      state.hasAccess = true;
    },
    revokeAccess: (state) => {
      state.hasAccess = false;
    },
  },
});

export const { grantAccess, revokeAccess } = accessControlReducer.actions;

export default accessControlReducer.reducer;
