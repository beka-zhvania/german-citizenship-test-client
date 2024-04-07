import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedState,
  setCommonQuestionIndices,
  setStateSpecificQuestionIndices,
} from '../redux/citizenship_test_reducer';

// Custom hook to manage and access citizenship test state
export function useCitizenshipTest() {
  const dispatch = useDispatch();
  
  // Selector hooks to access the state
  const selectedState = useSelector(state => state.citizenshipTest.selectedState);
  const commonQuestionIndices = useSelector(state => state.citizenshipTest.commonQuestionIndices);
  const stateSpecificQuestionIndices = useSelector(state => state.citizenshipTest.stateSpecificQuestionIndices);

  // Action dispatchers
  const updateSelectedState = (newState) => {
    dispatch(setSelectedState(newState));
  };

  const updateCommonQuestionIndices = (indices) => {
    dispatch(setCommonQuestionIndices(indices));
  };

  const updateStateSpecificQuestionIndices = (indices) => {
    dispatch(setStateSpecificQuestionIndices(indices));
  };

  return {
    selectedState,
    commonQuestionIndices,
    stateSpecificQuestionIndices,
    updateSelectedState,
    updateCommonQuestionIndices,
    updateStateSpecificQuestionIndices,
  };
}
