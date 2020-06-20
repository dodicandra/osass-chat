import {firebase as auth} from '@react-native-firebase/auth';
import {
  firebase as db,
  FirebaseDatabaseTypes,
} from '@react-native-firebase/database';
import moment from 'moment';
import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {RootState, store} from 'store';
import {
  ChatDataTypes,
  clearChatActions,
  setchatAction,
  setChatHistoryAction,
} from 'store/chat';

const dbRef = db.database().ref();

interface ChatKey {
  chatKey: string;
}

export const getUserChat = async (
  friendId: string,
): Promise<ChatKey | undefined> => {
  try {
    const user = auth.auth().currentUser;

    const snap = await dbRef
      .child(`userchat/${user?.uid}/${friendId}`)
      .once('value');

    return snap.val();
  } catch (err) {
    console.log(err);
  }
};

export const sendNewChat = async (
  userUid: string,
  friendUid: string,
  data: ChatDataTypes,
) => {
  try {
    const chatKey = dbRef.child('chats').push().key;

    await db.database().ref(`chats/${chatKey}/${moment().unix()}`).update(data);

    await dbRef.child(`userchat/${userUid}/${friendUid}`).set({chatKey});

    await dbRef.child(`userchat/${friendUid}/${userUid}`).set({chatKey});
    return true;
    // dbRef.child(`user/${friendUid}`).set(resKey.key);
  } catch (err) {
    console.log(err);
  }
};

export const setChatDataServices = (
  friendId: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
) => {
  try {
    const userChat = await getUserChat(friendId);

    if (!userChat) {
      dispatch(clearChatActions());
      return null;
    }
    return dbRef
      .child(`chats/${userChat?.chatKey}`)
      .on('value', (snap: FirebaseDatabaseTypes.DataSnapshot) => {
        const value = snap.val();
        if (value) {
          const chats = Object.keys(value).map((val) => value[val]);

          dispatch(setchatAction(chats));
        } else {
          dispatch(clearChatActions());
        }
      });
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const sendChat = (
  userUid: string,
  friendId: string,
  data: ChatDataTypes,
): ThunkAction<void, RootState, unknown, Action<string>> => async () => {
  try {
    const chatKey = await getUserChat(friendId);

    if (!chatKey) {
      await sendNewChat(userUid, friendId, data);
      return setChatDataServices(friendId);
    }
    await updateChat(chatKey?.chatKey, data);
    return setChatDataServices(friendId);
  } catch (err) {
    console.log(err);
  }
};

export const updateChat = async (
  chatKey: string | undefined,
  data: ChatDataTypes,
) => {
  try {
    return await dbRef.child(`chats/${chatKey}/${moment().unix()}`).set({
      ...data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUserChatContent = async (chatKey: string | undefined) => {
  try {
    const res = await dbRef.child(`chats/${chatKey}`).once('value');

    return res.val();
  } catch (err) {
    console.log(err);
  }
};

export const setChatHistorySevices = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  new Promise((resolve, reject) => {
    const user = auth.auth().currentUser;

    dbRef.child(`userchat/${user?.uid}`).on(
      'value',
      async (snap: FirebaseDatabaseTypes.DataSnapshot) => {
        const values = snap.val();
        if (values) {
          const chatsAll = await Object.keys(values).map(async (val) => {
            let contentChat = await getUserChatContent(values[val].chatKey);

            if (contentChat) {
              contentChat = Object.keys(contentChat).map(
                (con) => contentChat[con],
              );
            }

            const userProfile = await dbRef.child(`user/${val}`).once('value');

            return {
              uid: val,
              ...userProfile.val(),
              ...values[val],
              ...(contentChat && {
                lastchat: contentChat[contentChat.length - 1],
              }),
            };
          });

          Promise.all(chatsAll).then(async (response) => {
            dispatch(setChatHistoryAction(response));
            resolve(response);
          });
        }
      },
      (err: Error) => {
        reject(err);
        console.log('Err', err);
      },
    );
  });
};
