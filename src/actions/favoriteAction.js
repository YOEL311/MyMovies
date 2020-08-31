import {GET_FAVORITES_SUCCESS} from './types';
import database from '@react-native-firebase/database';
import Toast from 'react-native-simple-toast';

export const fetchFavorite = async (dispatch, userId) => {
  let arrFavorites = [];
  database()
    .ref('/users')
    .child(`${userId}`)
    .on('value', (snapshot) => {
      if (snapshot.val()) {
        arrFavorites = Object.keys(snapshot.val()).map((k) => k);
      }
      fetchFavoriteSuccess(dispatch, arrFavorites);
    });
};

const fetchFavoriteSuccess = (dispatch, favorite) => {
  dispatch({
    type: GET_FAVORITES_SUCCESS,
    payload: favorite,
  });
};

export const addFavorite = (userId, itemId) => {
  database()
    .ref(`/users/${userId}/${itemId}`)
    .set('')
    .then(() => Toast.show('added item', Toast.LONG));
};

export const removeFavorite = (userId, itemId) => {
  database()
    .ref(`/users/${userId}`)
    .child(`${itemId}`)
    .remove()
    .then(() => Toast.show('removed item', Toast.LONG));
};
