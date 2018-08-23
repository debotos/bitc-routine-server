import axios from 'axios';
import { history } from '../../components/App';

import {
  GET_PROFILE,
  GET_PROFILES,
  GET_TEACHERS,
  GET_SUBJECTS,
  GET_ALL_SEMESTER,
  RESET_PROFILE_REDUCER,
  STOP_LOADING,
  GET_ALL_ROUTINE_PERIOD
} from './types';

import { setProfileLoading, clearErrors } from './profileActions';
import { resetTeachersData } from './teacherActions';
import { resetSubjectsData } from './subjectActions';
import { resetSemesterData } from './semesterActions';
import { resetRoutinePeriodData } from './routineActions';

// App initialize with data
export const appInit = () => dispatch => {
  // Removing all data (if have)
  dispatch(clearErrors());
  dispatch({ type: RESET_PROFILE_REDUCER });
  dispatch(resetTeachersData());
  dispatch(resetSubjectsData());
  dispatch(resetSemesterData());
  dispatch(resetRoutinePeriodData());

  // Start the loader (don't start it before cleaning)
  dispatch(setProfileLoading());
  setTimeout(() => {
    axios
      .get('/init')
      .then(res => {
        const {
          myProfile,
          allProfiles,
          subjects,
          teachers,
          semesters,
          routine
        } = res.data;
        // console.log(res.data);
        // fill the app with new data
        dispatch({
          type: GET_PROFILE,
          payload: myProfile
        });
        dispatch({
          type: GET_PROFILES,
          payload: allProfiles
        });
        dispatch({
          type: GET_TEACHERS,
          payload: teachers
        });
        dispatch({
          type: GET_SUBJECTS,
          payload: subjects
        });
        dispatch({
          type: GET_ALL_SEMESTER,
          payload: semesters
        });
        dispatch({
          type: GET_ALL_ROUTINE_PERIOD,
          payload: routine
        });

        dispatch({ type: STOP_LOADING });
      })
      .catch(err => {
        console.log(err);
        history.push('/');
      });
  }, 2000);
};
