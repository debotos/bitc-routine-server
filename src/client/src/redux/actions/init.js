import axios from 'axios';

import {
  GET_PROFILE,
  GET_PROFILES,
  STOP_LOADING,
  RESET_PROFILE_REDUCER
} from './types';

import { setProfileLoading, clearErrors } from './profileActions';

// App initialize with data
export const appInit = () => dispatch => {
  // Removing all data (if have)
  dispatch(clearErrors());
  dispatch({ type: RESET_PROFILE_REDUCER });

  // Start the loader (don't start it before cleaning)
  dispatch(setProfileLoading());
  setTimeout(() => {
    axios
      .get('/init')
      .then(res => {
        const { myProfile, allProfiles } = res.data;
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

        dispatch({ type: STOP_LOADING });
      })
      .catch(err => {
        console.log(err);
      });
  }, 2000);
};
