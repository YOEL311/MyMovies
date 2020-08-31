import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER,
  LOGOUT_USER_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: '',
  favorite: [],
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      return INITIAL_STATE;
    }
    case LOGIN_USER_SUCCESS: {
      return {...state, user: action.payload};
    }
    case LOGOUT_USER_SUCCESS: {
      return {...state, user: null};
    }
    default:
      return state;
  }
};

export default authReducer;
