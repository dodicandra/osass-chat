import {Notification} from 'react-native-firebase/notifications';

import notife, {AndroidStyle} from '@notifee/react-native';

export const showNotif = async (res: Notification) => {
  const channelId = await notife.createChannel({
    id: res.notificationId,
    name: 'default',
    vibration: true,
    vibrationPattern: [100, 300],
    sound: 'wa'
  });
  await notife.displayNotification({
    id: res.notificationId.toString(),
    android: {
      channelId,
      style: {
        type: AndroidStyle.MESSAGING,
        person: {name: 'DODI', icon: res.data.image},
        messages: [{text: res.body, timestamp: Date.now()}]
      },
      vibrationPattern: [100, 300],
      sound: 'wa.mp3'
    },
    title: res.title,
    body: res.body
  });
};
