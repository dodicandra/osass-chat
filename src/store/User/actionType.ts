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

export const updateUserImg = (url: string): UserActionType => ({
  type: 'UPDATE_USER_DATA',
  payload: {imgUrl: url},
});

export const updateUserNameAction = (data: string): UserActionType => ({
  type: 'UPDATE_USER_DATA',
  payload: {name: data},
});

export const updateBioAction = (
  data: string | undefined | null,
): UserActionType => ({
  type: 'UPDATE_USER_DATA',
  payload: {bio: data},
});
