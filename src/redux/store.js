import { configureStore } from '@reduxjs/toolkit';
import questionReducer from './question_reducer';
import resultReducer from './result_reducer';

export default configureStore({
  reducer: {
    questions: questionReducer,
    result: resultReducer,
  },
});
