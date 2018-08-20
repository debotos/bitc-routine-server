import axios from 'axios';
import {
  GET_TEACHERS,
  ADD_TEACHER,
  REMOVE_TEACHER,
  UPDATE_TEACHER,
  RESET_TEACHER_REDUCER,
  GET_ERRORS
} from './types';

export const getTeachers = () => dispatch => {
  axios
    .get('/api/teachers')
    .then(res =>
      dispatch({
        type: GET_TEACHERS,
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

export const addTeacher = data => dispatch => {
  axios
    .post('/api/teachers/add', data)
    .then(res =>
      dispatch({
        type: ADD_TEACHER,
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

export const updateTeacher = (id, dataUpdate) => dispatch => {
  axios
    .post(`/api/teachers/${id}`, dataUpdate)
    .then(res =>
      dispatch({
        type: UPDATE_TEACHER,
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

export const removeTeacher = id => dispatch => {
  axios
    .delete(`/api/teachers/${id}`)
    .then(res =>
      dispatch({
        type: REMOVE_TEACHER,
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

export const resetTeachersData = () => {
  return {
    type: RESET_TEACHER_REDUCER
  };
};
