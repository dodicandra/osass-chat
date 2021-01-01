/**
 * @format
 */

import 'react-native-gesture-handler';

import {Alert, AppRegistry} from 'react-native';
import {fire} from 'utils';

import App from './App';
import {name as appName} from './app.json';

const foreGroundMEssage = async () => {
  const firebase = fire.messaging().onMessage((message) => {
    Alert.alert(message);
  });
  return Promise.resolve(firebase);
};

AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerHeadlessTask(appName, () => foreGroundMEssage);
