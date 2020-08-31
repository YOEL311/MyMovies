import {combineReducers} from 'redux';
import AuthReducer from './authReducer';
import FavoriteReducer from './favoriteReducer';

export default combineReducers({
  auth: AuthReducer,
  favorite: FavoriteReducer,
});
