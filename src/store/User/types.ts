import {
  CLEAR_TOKEN,
  CLEAR_USER,
  SET_TOKEN,
  SET_USER,
  SET_USERS,
  UPDATE_USER_DATA,
  SEARCH_USER
} from 'store/constan';

export interface UserInterface {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  imgUrl?: string | null;
  bio?: string | null;
  uid?: string | null;
}

export interface UsersDataTypes {
  name?: string;
  email?: string;
  bio?: string;
  uid?: string | undefined;
  imgUrl?: string;
}

export interface UserState {
  user: UserInterface;
  token: null | undefined | string;
  users: UsersDataTypes[];
}

export interface UpdateUser {
  type: typeof UPDATE_USER_DATA;
  payload: UserInterface;
}

interface setUsersTypes {
  type: typeof SET_USERS;
  payload: UsersDataTypes[];
}

interface SearchUserTypes {
  type: typeof SEARCH_USER;
  payload: UsersDataTypes[];
}

interface SetUserType {
  type: typeof SET_USER;
  payload: UserInterface;
  token?: string;
}

interface ClearUserType {
  type: typeof CLEAR_USER;
  payload?: string;
}

interface SetTokeType {
  type: typeof SET_TOKEN;
  payload?: string;
}

interface ClearTokenType {
  type: typeof CLEAR_TOKEN;
}

export type UserActionType =
  | SetUserType
  | ClearUserType
  | SetTokeType
  | ClearTokenType
  | UpdateUser
  | setUsersTypes
  | SearchUserTypes;
