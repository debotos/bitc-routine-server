import {
  GET_ALL_SEMESTER,
  ADD_SEMESTER,
  REMOVE_SEMESTER,
  UPDATE_SEMESTER,
  RESET_SEMESTER_REDUCER
} from '../actions/types';

const initialState = {
  semesterArray: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_SEMESTER_REDUCER:
      console.log('***** Cleaning all semester data *****');
      return initialState;
    case ADD_SEMESTER:
      // action.payload is an obj
      // console.log(action.payload);
      // console.log('state', state['semesterArray']);

      let newSemesterList;
      if (state['semesterArray'] === null) {
        newSemesterList = [action.payload];
      } else {
        newSemesterList = [action.payload, ...state['semesterArray']];
      }
      // console.log('after calc', newSemesterList);

      return {
        ...state,
        semesterArray: newSemesterList
      };
    case UPDATE_SEMESTER:
      let resUpdate = action.payload;
      let updatedAllSemesterList = state['semesterArray'].map(singleItem => {
        if (singleItem._id.toString() === resUpdate._id.toString()) {
          return resUpdate;
        } else {
          return singleItem;
        }
      });
      return {
        ...state,
        semesterArray: updatedAllSemesterList
      };
    case GET_ALL_SEMESTER:
      // action.payload is an array
      // console.log('All SemesterList -> ', action.payload);
      let semesterArray;
      if (state['semesterArray'] === null) {
        semesterArray = [...action.payload];
      } else {
        semesterArray = [...action.payload, ...state['semesterArray']];
      }
      return {
        ...state,
        semesterArray
      };
    case REMOVE_SEMESTER:
      let res = action.payload.removedSemester;
      console.log('Before semester delete ', state['semesterArray']);
      let allsemesterArray = state['semesterArray'].filter(
        singleItem => singleItem._id.toString() !== res._id.toString()
      );
      console.log('After semester delete ', allsemesterArray);
      return {
        ...state,
        semesterArray: allsemesterArray
      };
    default:
      return state;
  }
}
