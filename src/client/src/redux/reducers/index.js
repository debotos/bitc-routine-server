import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import teacherReducer from './teacherReducer';
import subjectReducer from './subjectReducer';
import semesterReducer from './semesterReducer';
import routineReducer from './routineReducer';
import filtersReducer from './filters';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  teachers: teacherReducer,
  subjects: subjectReducer,
  semesters: semesterReducer,
  routine: routineReducer,
  filters: filtersReducer
});
