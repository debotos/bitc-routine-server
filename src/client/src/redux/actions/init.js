import axios from 'axios';
import { history } from '../../components/App';

import {
  GET_PROFILE,
  GET_PROFILES,
  GET_TEACHERS,
  GET_SUBJECTS,
  RESET_PROFILE_REDUCER,
  STOP_LOADING
} from './types';

import { setProfileLoading, clearErrors } from './profileActions';
import { resetTeachersData } from './teacherActions';
import { resetSubjectsData } from './subjectActions';

// App initialize with data
export const appInit = () => dispatch => {
  // Removing all data (if have)
  dispatch(clearErrors());
  dispatch({ type: RESET_PROFILE_REDUCER });
  dispatch(resetTeachersData());
  dispatch(resetSubjectsData());

  // Start the loader (don't start it before cleaning)
  dispatch(setProfileLoading());
  setTimeout(() => {
    axios
      .get('/init')
      .then(res => {
        const { myProfile, allProfiles, subjects, teachers } = res.data;
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

        dispatch({ type: STOP_LOADING });
      })
      .catch(err => {
        console.log(err);
        history.push('/');
      });
  }, 2000);
};
