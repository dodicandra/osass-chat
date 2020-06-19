import {
  firebase as db,
  FirebaseDatabaseTypes,
} from '@react-native-firebase/database';
import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {RootState} from 'store';
import {
  ChatAllTypes,
  ChatDataTypes,
  clearChatActions,
  setchatAction,
} from 'store/chat';
import {getYear} from 'utils/helper';

export const sendChatServeices = (
  friendUid: string | undefined,
  userUid: string | undefined | null,
  data: ChatDataTypes,
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
) => {
  try {
    const dbRef = db.database().ref('chats/');

    dbRef.child(`${friendUid}_${userUid}/${getYear}`).push(data);
  } catch (err) {
    console.log(err);
  }
};

export const setChatServices = (
  friendUid: string | undefined,
  userUid: string | undefined | null,
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
) => {
  try {
    const dbRef = db.database().ref();

    dbRef
      .child('chats/')
      .child(`${friendUid}_${userUid}/`)
      .on('value', (snap: FirebaseDatabaseTypes.DataSnapshot) => {
        const values = snap.val();
        const forrr = snap.toJSON();
        console.log('forr', forrr);

        if (values) {
          const allChat: ChatAllTypes[] = [];

          Object.keys(values).map((item) => {
            const chats = values[item];

            const data: ChatDataTypes[] = [];
            Object.keys(chats).map((cht) => {
              data.push({
                id: cht,
                ...chats[cht],
              });
            });

            allChat.push({
              tanggal: item,
              data: data.reverse(),
            });
          });

          dispatch(setchatAction(allChat));
        } else {
          dispatch(clearChatActions());
        }
      });
  } catch (err) {
    console.log(err);
  }
};
