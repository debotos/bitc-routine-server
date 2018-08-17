import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  STOP_LOADING,
  DELETE_PROFILE,
  CLEAR_CURRENT_PROFILE,
  RESET_PROFILE_REDUCER
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_PROFILE_REDUCER:
      console.log('***** Cleaning all profile data *****');
      return initialState;
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case GET_PROFILES:
      // console.log('All Profiles -> ', action.payload);
      let profiles;
      if (state['profiles'] === null) {
        profiles = [...action.payload];
      } else {
        profiles = [...state['profiles'], ...action.payload];
      }
      return {
        ...state,
        profiles
      };
    case DELETE_PROFILE:
      let res = action.payload.userRemoved;
      // console.log('Before delete ', state['profiles']);
      let allprofiles = state['profiles'].filter(
        singleItem => singleItem.email !== res.email
      );
      // console.log('After delete ', allprofiles);
      return {
        ...state,
        profiles: allprofiles
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
