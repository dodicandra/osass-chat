import {ThunkAction} from 'redux-thunk';
import {RootState, setLoading, setUser, setError, stopLoading} from 'store';
import {Action} from 'redux';
import {firebase} from '@react-native-firebase/auth';
import {setToLocal} from 'utils';

interface SingInTypes {
  email: string;
  password: string;
}

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
      const userss = auth.user;
      const token = await userss.getIdTokenResult(true).then((res) => res);
      await setToLocal('token', token.token);
      dispatch(
        setUser(
          {
            name: userss.displayName,
            email: userss.email,
            phone: userss.phoneNumber,
          },
          token.token,
        ),
      );
      dispatch(stopLoading());
    }
  } catch (err) {
    dispatch(setError(err.message));
    dispatch(stopLoading());
  }
};
