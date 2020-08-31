import {GET_FAVORITES_SUCCESS} from '../actions/types';

const INITIAL_STATE = {
  favorite: [],
};

const favoriteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_FAVORITES_SUCCESS: {
      return {...state, favorite: action.payload};
    }
    default:
      return state;
  }
};

export default favoriteReducer;
