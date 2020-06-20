import {firebase as auth} from '@react-native-firebase/auth';
import {
  firebase as db,
  FirebaseDatabaseTypes,
} from '@react-native-firebase/database';
import {firebase as storage} from '@react-native-firebase/storage';
import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import RNblob from 'rn-fetch-blob';
import {ImageTypes} from 'screen';
import {
  RootState,
  searchUsers,
  setLoading,
  setUser,
  stopLoading,
  updateBioAction,
  updateUserImg,
  updateUserNameAction,
  UserInterface,
  UsersDataTypes,
} from 'store';

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

    await user?.updateProfile({photoURL: imgUrl});

    await dbRef.child(`user/${user?.uid}`).update({imgUrl});
    dispatch(updateUserImg(imgUrl));
    console.log(user);
    return imgUrl;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const updateUserName = (
  data: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
) => {
  try {
    dispatch(setLoading());
    const user = auth.auth().currentUser;
    const dbref = db.database().ref();
    await user?.updateProfile({displayName: data});
    await dbref.child(`user/${user?.uid}`).update({name: data});
    dispatch(updateUserNameAction(data));
    dispatch(stopLoading());
  } catch (err) {
    console.log(err.message);
    dispatch(stopLoading());
    throw err;
  }
};

export const updateBio = (
  data: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
) => {
  try {
    dispatch(setLoading());
    const user = auth.auth().currentUser;
    const dbref = db.database().ref();

    await dbref.child(`user/${user?.uid}`).update({
      bio: data,
    });

    dispatch(updateBioAction(data));

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
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
        uid: user?.uid,
      }),
    );
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

// GET

export const getUserBio = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    const user = auth.auth().currentUser;
    const dbref = db.database().ref(`user/${user?.uid}`);

    await dbref.once(
      'value',
      (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
        const data: UserInterface = snapshot.val();

        console.log(data.bio);
        dispatch(updateBioAction(data.bio));
      },
    );
  } catch (err) {
    console.log(err);
  }
};

export const getAllUsers = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    const dbref = db.database().ref('user');

    dbref.once('value', (snap: FirebaseDatabaseTypes.DataSnapshot) => {
      const data = snap.val();
      const allUsers: string[] = [];
      Object.keys(data).map((val) => {
        allUsers.push({
          id: val,
          ...data[val],
        });
      });
      dispatch(searchUsers(allUsers as UsersDataTypes[]));
    });
  } catch (err) {
    console.log(err.message);
  }
};
