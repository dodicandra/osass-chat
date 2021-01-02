import {Notifications} from 'react-native-notifications';

import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

export const showNotifWix = (res: FirebaseMessagingTypes.RemoteMessage) => {
  console.log(res.notification?.android);
  Notifications.postLocalNotification({
    body: res.data?.content!,
    title: res.data?.user!,
    badge: 1,
    identifier: res.messageId!,
    sound: 'wa.mp3',
    payload: '',
    thread: '',
    type: ''
  });
};

// export const showNotif = async (res: FirebaseMessagingTypes.RemoteMessage) => {
//   const channelId = await notife.createChannel({
//     id: res.messageId!,
//     name: 'default',
//     vibration: true,
//     vibrationPattern: [100, 300],
//     sound: 'wa'
//   });

//   await notife.displayNotification({
//     id: res.messageId,
//     android: {
//       channelId,
//       style: {
//         type: AndroidStyle.MESSAGING,
//         person: {name: res.data?.user!, icon: res.data?.image},
//         messages: [{text: res.data?.content!, timestamp: Date.now()}]
//       },
//       vibrationPattern: [100, 300],
//       sound: 'wa.mp3'
//     },
//     title: res.data?.user,
//     body: res.data?.content
//   });
// };
