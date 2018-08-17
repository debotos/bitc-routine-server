import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      // console.log(action.payload);
      return action.payload;
    case CLEAR_ERRORS:
      console.log('***** Cleaning global all errors *****');
      return {};
    default:
      return state;
  }
}
