import {firebase as auth} from '@react-native-firebase/auth';
import {firebase as db} from '@react-native-firebase/database';
import {firebase as storage} from '@react-native-firebase/storage';
import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import RNblob from 'rn-fetch-blob';
import {ImageTypes} from 'screen';
import {RootState, setUser, updateUserAction} from 'store';

export const uploadImageUser = (
  data: ImageTypes,
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
) => {
  try {
    const dbRef = db.database().ref();

    const user = auth.auth().currentUser;

    const fileRef = storage.storage().ref(`image/User${user?.uid}`);

    const fs = RNblob.fs;
    const stat = await fs.stat(data.uri as string);
    const path = stat.path;

    await fileRef.putFile(`${path}`);
    const imgUrl = await fileRef.getDownloadURL();

    await dbRef.child(`user/${user?.uid}`).update({imgUrl});
    dispatch(updateUserAction(imgUrl));

    return imgUrl;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const getUserDataAction = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    const user = auth.auth().currentUser;
    dispatch(
      setUser({
        email: user?.displayName,
        imgUrl: user?.photoURL,
        name: user?.displayName,
      }),
    );
  } catch (err) {
    console.log(err);
  }
};
