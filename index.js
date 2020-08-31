/**
 * @format
 */
import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import Stack from './src/router/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Stack);
