/**
 * @format
 */

import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import {Notification, Notifications} from 'react-native-notifications';
import {showNotifWix} from 'utils/notife';

import messaging from '@react-native-firebase/messaging';

import App from './App';
import {name as appName} from './app.json';

Notifications.registerRemoteNotifications();

messaging().setBackgroundMessageHandler(async (res) => {
  showNotifWix(res);
});

Notifications.events().registerNotificationReceivedBackground(
  (notification: Notification, completion: (response: NotificationCompletion) => void) => {
    console.log('Notification Received - Background', notification.body);

    // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
    completion({alert: true, sound: true, badge: false});
  }
);

AppRegistry.registerComponent(appName, () => App);
