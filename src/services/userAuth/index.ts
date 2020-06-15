import {ThunkAction} from 'redux-thunk';
import {
  RootState,
  setLoading,
  setUser,
  setError,
  stopLoading,
  setToken,
} from 'store';
import {Action} from 'redux';
import {firebase} from '@react-native-firebase/auth';
import {firebase as db} from '@react-native-firebase/database';
import {setToLocal} from 'utils';

interface SingInTypes {
  email: string;
  password: string;
}

interface RegisterTypes {
  email: string;
  username: string;
  password: string;
}

//login user services
export const signInService = (
  data: SingInTypes,
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
) => {
  try {
    dispatch(setLoading());
    const auth = await firebase
      .auth()
      .signInWithEmailAndPassword(data.email?.trim(), data.password?.trim());
    if (auth?.user) {
      const {displayName, email, phoneNumber} = auth.user;

      const curenUser = await firebase.auth().currentUser;
      const token = await curenUser?.getIdTokenResult(true).then((res) => res);

      await setToLocal('token', token?.token);
      dispatch(
        setUser({
          name: displayName,
          email: email,
          phone: phoneNumber,
        }),
      );
      dispatch(setToken(token?.token));
      dispatch(stopLoading());
    }
  } catch (err) {
    dispatch(setError(err.message));
    dispatch(stopLoading());
  }
};

// register user services
export const registerService = (
  data: RegisterTypes,
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatach,
) => {
  try {
    dispatach(setLoading());
    const register = await firebase
      .auth()
      .createUserWithEmailAndPassword(data.email.trim(), data.password.trim());
    if (register.user) {
      await register.user.updateProfile({
        displayName: data.username,
      });
      const auths = await firebase.auth().currentUser;

      const {email, phoneNumber} = register.user;

      const token = await auths?.getIdTokenResult(true).then((res) => res);

      const dbref = await db.database().ref();

      dispatach(
        setUser({name: auths?.displayName, email: email, phone: phoneNumber}),
      );
      await setToLocal('token', token?.token);
      dispatach(setToken(token?.token));
      const respon = await dbref
        .child(`user/${register.user.uid}`)
        .set({name: data.username});
      dispatach(stopLoading());
      return respon;
    }
  } catch (err) {
    dispatach(stopLoading());
    throw err;
  }
};
