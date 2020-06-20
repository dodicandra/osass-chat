import {UserActionType, UserInterface, UsersDataTypes} from './types';

export const setUser = ({
  name,
  email,
  phone,
  imgUrl,
  uid,
}: UserInterface): UserActionType => ({
  type: 'SET_USER',
  payload: {name, email, phone, imgUrl, uid},
});

export const searchUsers = (data: UsersDataTypes[]): UserActionType => ({
  type: 'SET_USERS',
  payload: data,
});

export const filterUsers = (data: UsersDataTypes[]): UserActionType => ({
  type: 'SEARCH_USER',
  payload: data,
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

export const updateBioAction = (data: string): UserActionType => ({
  type: 'UPDATE_USER_DATA',
  payload: {bio: data},
});
