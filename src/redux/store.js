import { configureStore } from '@reduxjs/toolkit';
import questionReducer from './question_reducer';
import resultReducer from './result_reducer';
import citizenshipTestReducer from './citizenship_test_reducer'
import accessControlReducer  from './access_control_reducer';

export default configureStore({
  reducer: {
    questions: questionReducer,
    result: resultReducer,
    citizenshipTest : citizenshipTestReducer,
    accessControl : accessControlReducer
  },
});
