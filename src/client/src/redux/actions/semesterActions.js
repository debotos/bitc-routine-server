import axios from 'axios';
import {
  GET_ALL_SEMESTER,
  ADD_SEMESTER,
  REMOVE_SEMESTER,
  UPDATE_SEMESTER,
  RESET_SEMESTER_REDUCER,
  GET_ERRORS
} from './types';

export const getAllSemester = () => dispatch => {
  axios
    .get('/api/semester/')
    .then(res =>
      dispatch({
        type: GET_ALL_SEMESTER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addSemester = data => dispatch => {
  axios
    .post('/api/semester/add', data)
    .then(res =>
      dispatch({
        type: ADD_SEMESTER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updateSemester = (id, dataUpdate) => dispatch => {
  axios
    .post(`/api/semester/${id}`, dataUpdate)
    .then(res =>
      dispatch({
        type: UPDATE_SEMESTER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const removeSemester = id => dispatch => {
  axios
    .delete(`/api/semester/${id}`)
    .then(res =>
      dispatch({
        type: REMOVE_SEMESTER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const resetSemesterData = () => {
  return {
    type: RESET_SEMESTER_REDUCER
  };
};
