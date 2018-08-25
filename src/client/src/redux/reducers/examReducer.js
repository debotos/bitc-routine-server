import {
  GET_EXAMS,
  ADD_EXAM,
  REMOVE_EXAM,
  UPDATE_EXAM,
  RESET_EXAM_REDUCER
} from '../actions/types';

const initialState = {
  exams: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_EXAM_REDUCER:
      console.log('***** Cleaning all exam data *****');
      return initialState;
    case ADD_EXAM:
      // action.payload is an obj
      let newExams;
      if (state['exams'] === null) {
        newExams = [action.payload];
      } else {
        newExams = [action.payload, ...state['exams']];
      }
      return {
        ...state,
        exams: newExams
      };
    case UPDATE_EXAM:
      let resUpdate = action.payload;
      let updatedAllExams = state['exams'].map(singleItem => {
        if (singleItem._id.toString() === resUpdate._id.toString()) {
          return resUpdate;
        } else {
          return singleItem;
        }
      });
      return {
        ...state,
        exams: updatedAllExams
      };
    case GET_EXAMS:
      // action.payload is an array
      // console.log('All Exams -> ', action.payload);
      let exams;
      if (state['exams'] === null) {
        exams = [...action.payload];
      } else {
        exams = [...action.payload, ...state['exams']];
      }
      return {
        ...state,
        exams: exams
      };
    case REMOVE_EXAM:
      let res = action.payload.removedExam;
      // console.log('Before exam delete ', state['exams']);
      let allexams = state['exams'].filter(
        singleItem => singleItem._id.toString() !== res._id.toString()
      );
      // console.log('After exam delete ', allexams);
      return {
        ...state,
        exams: allexams
      };
    default:
      return state;
  }
}
