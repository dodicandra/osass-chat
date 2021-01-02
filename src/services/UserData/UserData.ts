// ts-import-sorter: disable

import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {ImageTypes} from 'screen';
import {
  searchUsers,
  setLoading,
  setUser,
  stopLoading,
  updateBioAction,
  updateUserImg,
  updateUserNameAction,
  RootState,
  UsersDataTypes,
  UserInterface
} from 'store';
import {fire} from 'utils';

import fireStrg from '@react-native-firebase/storage';

export const uploadImageUser = (data: ImageTypes): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    const dbRef = fire.database().ref();

    const user = fire.auth().currentUser;

    const fileRef = fireStrg().ref(`image/User${user?.uid}`);

    await fileRef.putFile(`${data.uri}`);
    const imgUrl = await fileRef.getDownloadURL();

    await user?.updateProfile({photoURL: imgUrl});

    await dbRef.child(`user/${user?.uid}`).update({imgUrl});
    dispatch(updateUserImg(imgUrl));
    return imgUrl;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const updateUserName = (data: string): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    dispatch(setLoading());
    const user = fire.auth().currentUser;
    const dbref = fire.database().ref();
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

export const updateBio = (data: string): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    dispatch(setLoading());
    const user = fire.auth().currentUser;
    const dbref = fire.database().ref();

    await dbref.child(`user/${user?.uid}`).update({
      bio: data
    });

    dispatch(updateBioAction(data));

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    console.log(err.message);
    throw err;
  }
};

export const getUserDataAction = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    const user = fire.auth().currentUser;
    dispatch(
      setUser({
        email: user?.displayName,
        imgUrl: user?.photoURL,
        name: user?.displayName,
        uid: user?.uid
      })
    );
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

// GET

export const getUserBio = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    const user = fire.auth().currentUser;
    const dbref = fire.database().ref(`user/${user?.uid}`);

    await dbref.once('value', (snapshot) => {
      const data: UserInterface = snapshot.val();

      dispatch(updateBioAction(data.bio));
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllUsers = (): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  try {
    const dbref = fire.database().ref('user');

    dbref.once('value', (snap) => {
      const data = snap.val();
      const allUsers: string[] = [];
      Object.keys(data).map((val) => {
        allUsers.push({
          uid: val,
          ...data[val]
        });
      });
      dispatch(searchUsers(allUsers as UsersDataTypes[]));
    });
  } catch (err) {
    console.log(err.message);
  }
};
