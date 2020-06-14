import {UserActionType, UserInterface} from './types';

// export const setUserAction = (): ThunkAction<
//   void,
//   RootState,
//   unknown,
//   Action<string>
// > => async (dispatch) => {
//   try {
//     dispatch({type: ''});
//     console.log('haloo');
//   } catch (err) {}
// };

export const setUser = (
  {name, email, phone}: UserInterface,
  token: string,
): UserActionType => ({
  type: 'SET_USER',
  payload: {name, email, phone},
  token,
});

export const clearUser = (): UserActionType => ({
  type: 'CLEAR_USER',
});

export const setToken = (token: string): UserActionType => ({
  type: 'SET_TOKEN',
  payload: token,
});

export const clearToken = (): UserActionType => ({
  type: 'CLEAR_TOKEN',
});
