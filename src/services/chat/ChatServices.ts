import moment from 'moment';
import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {RootState} from 'store';
import {clearChatActions, setchatAction, setChatHistoryAction, ChatDataTypes} from 'store/chat';
import {fire} from 'utils';
import {httpToken} from 'utils/http-token';

const dbRef = fire.database().ref();
const auth = fire.auth();

interface ChatKey {
  chatKey: string;
}

export const getUserChat = async (friendId: string | undefined): Promise<ChatKey | undefined> => {
  try {
    const user = auth.currentUser;

    const snap = await dbRef.child(`userchat/${user?.uid}/${friendId}`).once('value');

    return snap.val();
  } catch (err) {
    console.log(err);
  }
};

export const sendNewChat = async (
  userUid: string | undefined,
  friendUid: string | undefined,
  data: ChatDataTypes
) => {
  try {
    const chatKey = dbRef.child('chats').push().key;

    const race1 = fire.database().ref(`chats/${chatKey}/${moment().unix()}`).update(data);

    const race2 = dbRef
      .child(`userchat/${userUid}/${friendUid}`)
      .set({chatKey, createAt: moment().toISOString()});

    const race3 = dbRef
      .child(`userchat/${friendUid}/${userUid}`)
      .set({chatKey, createAt: moment().toISOString()});

    const userpushToken = (await dbRef.child(`user/${friendUid}`).once('value')).val();
    const body = {
      to: userpushToken.token,
      notification: {
        body: data.content,
        title: auth.currentUser?.displayName
      }
    };

    await httpToken(body);

    return await Promise.all([race1, race2, race3]);
  } catch (err) {
    console.log(err);
  }
};

export const setChatDataServices = (
  friendId: string | undefined
): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    const userChat = await getUserChat(friendId);

    if (!userChat) {
      dispatch(clearChatActions());
      return null;
    }

    return dbRef.child(`chats/${userChat?.chatKey}`).on('value', (snap) => {
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

export const updateChat = async (
  userUid: string | undefined,
  friendUid: string | undefined,
  chatKey: string | undefined,
  data: ChatDataTypes
) => {
  try {
    await dbRef.child(`userchat/${userUid}/${friendUid}`).update({chatKey, createAt: moment().toISOString()});

    await dbRef.child(`userchat/${friendUid}/${userUid}`).update({chatKey, createAt: moment().toISOString()});

    await dbRef.child(`chats/${chatKey}/${moment().unix()}`).set({
      ...data
    });

    const userpushToken = (await dbRef.child(`user/${friendUid}`).once('value')).val();

    const body = {
      to: userpushToken.token,
      notification: {
        body: data.content,
        title: auth.currentUser?.displayName
      }
    };

    await httpToken(body);
  } catch (err) {
    console.log('EROR =>', err);
    throw err;
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

export const setChatHistorySevices = (): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  new Promise((resolve, reject) => {
    const user = auth.currentUser;

    dbRef.child(`userchat/${user?.uid}`).on(
      'value',
      async (snap) => {
        const values = snap.val();
        if (values) {
          const chatsAll = await Object.keys(values).map(async (val) => {
            let contentChat = await getUserChatContent(values[val].chatKey);

            if (contentChat) {
              contentChat = Object.keys(contentChat).map((con) => contentChat[con]);
            }

            const userProfile = await dbRef.child(`user/${val}`).once('value');

            return {
              uid: val,
              ...userProfile.val(),
              ...values[val],
              ...(contentChat && {
                lastchat: contentChat[contentChat.length - 1]
              })
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
      }
    );
  });
};
