import {
  GET_SUBJECTS,
  ADD_SUBJECT,
  REMOVE_SUBJECT,
  UPDATE_SUBJECT,
  RESET_SUBJECT_REDUCER
} from '../actions/types';

const initialState = {
  subjects: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_SUBJECT_REDUCER:
      console.log('***** Cleaning all subject data *****');
      return initialState;
    case ADD_SUBJECT:
      // action.payload is an obj
      let newSubjects;
      if (state['subjects'] === null) {
        newSubjects = [action.payload];
      } else {
        newSubjects = [action.payload, ...state['subjects']];
      }
      return {
        ...state,
        subjects: newSubjects.sort((a, b) => (a.code > b.code ? -1 : 1))
      };
    case UPDATE_SUBJECT:
      let resUpdate = action.payload;
      let updatedAllSubjects = state['subjects'].map(singleItem => {
        if (singleItem._id.toString() === resUpdate._id.toString()) {
          return resUpdate;
        } else {
          return singleItem;
        }
      });
      return {
        ...state,
        subjects: updatedAllSubjects.sort((a, b) => (a.code > b.code ? -1 : 1))
      };
    case GET_SUBJECTS:
      // action.payload is an array
      // console.log('All Subjects -> ', action.payload);
      let subjects;
      if (state['subjects'] === null) {
        subjects = [...action.payload];
      } else {
        subjects = [...action.payload, ...state['subjects']];
      }
      return {
        ...state,
        subjects: subjects.sort((a, b) => (a.code > b.code ? -1 : 1))
      };
    case REMOVE_SUBJECT:
      let res = action.payload.removedSubject;
      // console.log('Before subject delete ', state['subjects']);
      let allsubjects = state['subjects'].filter(
        singleItem => singleItem._id.toString() !== res._id.toString()
      );
      // console.log('After subject delete ', allsubjects);
      return {
        ...state,
        subjects: allsubjects.sort((a, b) => (a.code > b.code ? -1 : 1))
      };
    default:
      return state;
  }
}
