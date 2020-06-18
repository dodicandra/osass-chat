import {UserActionType, UserInterface} from './types';

export const setUser = ({
  name,
  email,
  phone,
  imgUrl,
}: UserInterface): UserActionType => ({
  type: 'SET_USER',
  payload: {name, email, phone, imgUrl},
});

export const clearUser = (): UserActionType => ({
  type: 'CLEAR_USER',
});

export const setToken = (token?: string): UserActionType => ({
  type: 'SET_TOKEN',
  payload: token,
});

export const clearToken = (): UserActionType => ({
  type: 'CLEAR_TOKEN',
});

export const updateUserAction = (url: string): UserActionType => ({
  type: 'UPDATE_USER_DATA',
  payload: {imgUrl: url},
});
