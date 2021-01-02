import notife, {AndroidStyle} from '@notifee/react-native';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

export const showNotif = async (res: FirebaseMessagingTypes.RemoteMessage) => {
  const channelId = await notife.createChannel({
    id: res.messageId!,
    name: 'default',
    vibration: true,
    vibrationPattern: [100, 300],
    sound: 'wa'
  });

  await notife.displayNotification({
    id: res.messageId,
    android: {
      channelId,
      style: {
        type: AndroidStyle.MESSAGING,
        person: {name: res.data?.user!, icon: res.data?.image},
        messages: [{text: res.data?.content!, timestamp: Date.now()}]
      },
      vibrationPattern: [100, 300],
      sound: 'wa.mp3'
    },
    title: res.data?.user,
    body: res.data?.content
  });
};
