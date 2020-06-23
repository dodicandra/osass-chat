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
  UsersDataTypes
} from 'store';
import {fire} from 'utils';

export const uploadImageUser = (
  data: ImageTypes
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  try {
    const dbRef = fire.database().ref();

    const user = fire.auth().currentUser;

    const fileRef = fire.storage().ref(`image/User${user?.uid}`);

    const fs = RNblob.fs;
    const stat = await fs.stat(data.uri as string);
    const path = stat.path;

    await fileRef.putFile(`${path}`);
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

export const updateUserName = (
  data: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
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

export const updateBio = (
  data: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
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

export const getUserDataAction = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
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

export const getUserBio = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
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

export const getAllUsers = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
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
