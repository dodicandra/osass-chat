/**
 * @format
 */

import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import {showNotif} from 'utils/notife';

import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

import App from './App';
import {name as appName} from './app.json';

messaging().setBackgroundMessageHandler(async (res) => {
  await showNotif(res);
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  if (type === EventType.DELIVERED) {
    await notifee.setBadgeCount(1);
  }

  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
    // Update external API

    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});
AppRegistry.registerComponent(appName, () => App);
