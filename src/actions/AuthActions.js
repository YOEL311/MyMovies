import {LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS} from './types';
import Toast from 'react-native-simple-toast';
import {GoogleSignin} from '@react-native-community/google-signin';
import {fetchFavorite} from './favoriteAction';

import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

const loginUserSuccess = (dispatch, user) => {
  Toast.show('login success', Toast.LONG);

  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user,
  });
  fetchFavorite(dispatch, user?.uid);
};

const logoutUserSuccess = (dispatch) => {
  Toast.show('logOut success', Toast.LONG);

  dispatch({
    type: LOGOUT_USER_SUCCESS,
  });
};

export const isSignIn = () => {
  return async (dispatch) => {
    console.log('is sign ');

    try {
      const userInfo = await auth().currentUser;
      if (userInfo) {
        console.log('is sign in user', userInfo);
        loginUserSuccess(dispatch, userInfo);
        // User is signed in.
      } else {
        // No user is signed in.
      }
    } catch (error) {}
  };
};
export const signOutFirebase = () => {
  return async (dispatch) => {
    try {
      await auth().signOut();
      logoutUserSuccess(dispatch);
    } catch (e) {}
  };
};

export const signInFacebook = () => {
  return async (dispatch) => {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();
    console.log('data', data);
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    await auth().signInWithCredential(facebookCredential);
    const userInfo = await auth().currentUser;
    console.log('user info facebook', userInfo);
    loginUserSuccess(dispatch, userInfo);
  };
};

export const signInGoogle = () => {
  return async (dispatch) => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      console.log(idToken);
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
    const userInfo = auth().currentUser;
    console.log('user info google', userInfo);
    loginUserSuccess(dispatch, userInfo);
  };
};
