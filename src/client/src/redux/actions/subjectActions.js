import axios from 'axios';
import {
  GET_SUBJECTS,
  ADD_SUBJECT,
  REMOVE_SUBJECT,
  UPDATE_SUBJECT,
  RESET_SUBJECT_REDUCER,
  GET_ERRORS
} from './types';

export const getSubjects = () => dispatch => {
  axios
    .get('/api/subjects')
    .then(res =>
      dispatch({
        type: GET_SUBJECTS,
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

export const addSubject = data => dispatch => {
  axios
    .post('/api/subjects/add', data)
    .then(res =>
      dispatch({
        type: ADD_SUBJECT,
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

export const updateSubject = (id, dataUpdate) => dispatch => {
  axios
    .post(`api/subjects/${id}`, dataUpdate)
    .then(res =>
      dispatch({
        type: UPDATE_SUBJECT,
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

export const removeSubject = id => dispatch => {
  axios
    .delete(`api/subjects/${id}`)
    .then(res =>
      dispatch({
        type: REMOVE_SUBJECT,
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

export const resetSubjectsData = () => {
  return {
    type: RESET_SUBJECT_REDUCER
  };
};
