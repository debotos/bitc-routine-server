import axios from 'axios';
import {
  GET_ALL_ROUTINE_PERIOD,
  ADD_ROUTINE_PERIOD,
  REMOVE_ROUTINE_PERIOD,
  UPDATE_ROUTINE_PERIOD,
  RESET_ROUTINE_PERIOD_REDUCER,
  ADD_CLASSES,
  REMOVE_CLASSES,
  UPDATE_CLASSES,
  GET_ERRORS
} from './types';

export const getAllRoutinePeriod = () => dispatch => {
  axios
    .get('/api/routine/')
    .then(res =>
      dispatch({
        type: GET_ALL_ROUTINE_PERIOD,
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

export const addRoutinePeriod = data => dispatch => {
  axios
    .post('/api/routine/add', data)
    .then(res =>
      dispatch({
        type: ADD_ROUTINE_PERIOD,
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

export const updateRoutinePeriod = (id, dataUpdate) => dispatch => {
  axios
    .post(`/api/routine/${id}`, dataUpdate)
    .then(res =>
      dispatch({
        type: UPDATE_ROUTINE_PERIOD,
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

export const removeRoutinePeriod = id => dispatch => {
  axios
    .delete(`/api/routine/${id}`)
    .then(res =>
      dispatch({
        type: REMOVE_ROUTINE_PERIOD,
        payload: res.data
      })
    )
    .catch(err => {
      console.log('RoutinePeriod Remove Error: ', err);
      dispatch({
        type: GET_ERRORS,
        payload: { error: 'Failed to delete routine period' }
      });
    });
};

/* CLASSES */

export const addClass = (routine_id, day, data) => dispatch => {
  axios
    .post(`/api/routine/${routine_id}/classes/${day}/add`, data)
    .then(res =>
      dispatch({
        type: ADD_CLASSES,
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

export const removeClass = (routine_id, day, classes_id) => dispatch => {
  axios
    .delete(`/api/routine/${routine_id}/classes/${day}/delete/${classes_id}`)
    .then(res =>
      dispatch({
        type: REMOVE_CLASSES,
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

export const updateClass = (
  routine_id,
  day,
  classes_id,
  dataUpdate
) => dispatch => {
  axios
    .post(
      `api/routine/${routine_id}/classes/${day}/edit/${classes_id}`,
      dataUpdate
    )
    .then(res =>
      dispatch({
        type: UPDATE_CLASSES,
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

export const resetRoutinePeriodData = () => {
  return {
    type: RESET_ROUTINE_PERIOD_REDUCER
  };
};
