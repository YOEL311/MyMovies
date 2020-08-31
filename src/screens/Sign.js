import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {WEB_API_KEY} from '../Utilities';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import {
  signOutFirebase,
  signInFacebook,
  signInGoogle,
  isSignIn,
} from '../actions/AuthActions';

const Signin = ({navigation}) => {
  const userInfo = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_API_KEY,
      offlineAccess: true,
    });
  }, []);

  console.log(userInfo);
  if (userInfo != null) {
    return (
      <View style={styles.container}>
        <Image source={{uri: userInfo.photoURL}} style={styles.imageStyle} />
        <Text style={styles.text}>Name: {userInfo.displayName} </Text>
        <Text style={styles.text}>Email: {userInfo.email}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(signOutFirebase())}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MyMovies')}>
          <Text>Go to MyMovies</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.containerButton}>
        <GoogleSigninButton
          style={styles.SigninButton}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Light}
          onPress={() => dispatch(signInGoogle())}
        />
        <Button title={'facebook'} onPress={() => dispatch(signInFacebook())} />
      </View>
    );
  }
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerButton: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
  },
  SigninButton: {width: 120, height: 48},
});
