import {
  GET_TEACHERS,
  ADD_TEACHER,
  REMOVE_TEACHER,
  UPDATE_TEACHER,
  RESET_TEACHER_REDUCER
} from '../actions/types';

const initialState = {
  teachers: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_TEACHER_REDUCER:
      console.log('***** Cleaning all teacher data *****');
      return initialState;
    case ADD_TEACHER:
      // action.payload is an obj
      // console.log(action.payload);
      // console.log('state', state['teachers']);

      let newTeachers;
      if (state['teachers'] === null) {
        newTeachers = [action.payload];
      } else {
        newTeachers = [action.payload, ...state['teachers']];
      }
      // console.log('after calc', newTeachers);

      return {
        ...state,
        teachers: newTeachers.sort((a, b) => (a.name < b.name ? -1 : 1))
      };
    case UPDATE_TEACHER:
      let resUpdate = action.payload;
      let updatedAllTeachers = state['teachers'].map(singleItem => {
        if (singleItem._id.toString() === resUpdate._id.toString()) {
          return resUpdate;
        } else {
          return singleItem;
        }
      });
      return {
        ...state,
        teachers: updatedAllTeachers.sort((a, b) => (a.name < b.name ? -1 : 1))
      };
    case GET_TEACHERS:
      // action.payload is an array
      // console.log('All Teachers -> ', action.payload);
      let teachers;
      if (state['teachers'] === null) {
        teachers = [...action.payload];
      } else {
        teachers = [...action.payload, ...state['teachers']];
      }
      return {
        ...state,
        teachers: teachers.sort((a, b) => (a.name < b.name ? -1 : 1))
      };
    case REMOVE_TEACHER:
      let res = action.payload.removedTeacher;
      // console.log('Before teacher delete ', state['teachers']);
      let allteachers = state['teachers'].filter(
        singleItem => singleItem._id.toString() !== res._id.toString()
      );
      // console.log('After teacher delete ', allteachers);
      return {
        ...state,
        teachers: allteachers.sort((a, b) => (a.name < b.name ? -1 : 1))
      };
    default:
      return state;
  }
}
