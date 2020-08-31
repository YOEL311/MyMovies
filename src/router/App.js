import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../screens/Sign';
import MyMovies from '../screens/MyMovies';
import MyFavorites from '../screens/MyFavorites';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducers';
import ReduxThunk from 'redux-thunk';
import {Text, View, TouchableHighlight} from 'react-native';
import {Badge} from 'react-native-elements';
const Stack = createStackNavigator();

const store = createStore(reducer, applyMiddleware(ReduxThunk));

const MyStack = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={SignIn}
            options={{
              title: 'Sign in',
            }}
          />
          <Stack.Screen
            name="MyFavorites"
            component={MyFavorites}
            options={{
              title: 'MyFavorites',
            }}
          />
          <Stack.Screen
            name="MyMovies"
            component={MyMovies}
            options={{
              title: 'MyMovies',
              headerRight: (navigation) => (
                <TouchableHighlight
                  onPress={() => navigation.navigate('MyFavorites')}>
                  <View>
                    <Text>My favorites</Text>
                    <Badge value={''} status="success" />
                  </View>
                </TouchableHighlight>
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default MyStack;
