import axios from 'axios';
import {
  GET_EXAMS,
  ADD_EXAM,
  REMOVE_EXAM,
  UPDATE_EXAM,
  RESET_EXAM_REDUCER,
  GET_ERRORS
} from './types';

export const getExams = () => dispatch => {
  axios
    .get('/api/exams')
    .then(res =>
      dispatch({
        type: GET_EXAMS,
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

export const addExam = data => dispatch => {
  axios
    .post('/api/exams/add', data)
    .then(res =>
      dispatch({
        type: ADD_EXAM,
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

export const updateExam = (id, dataUpdate) => dispatch => {
  axios
    .post(`/api/exams/${id}`, dataUpdate)
    .then(res =>
      dispatch({
        type: UPDATE_EXAM,
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

export const removeExam = id => dispatch => {
  axios
    .delete(`/api/exams/${id}`)
    .then(res =>
      dispatch({
        type: REMOVE_EXAM,
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

export const resetExamsData = () => {
  return {
    type: RESET_EXAM_REDUCER
  };
};
