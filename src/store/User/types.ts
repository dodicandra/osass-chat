import {
  CLEAR_TOKEN,
  CLEAR_USER,
  SET_TOKEN,
  SET_USER,
  SET_USERS,
  UPDATE_USER_DATA,
  SEARCH_USER,
} from 'store/constan';

export interface UserInterface {
  name?: string | undefined | null;
  email?: string | undefined | null;
  phone?: string | undefined | null;
  imgUrl?: string | undefined | null;
  bio?: string | undefined | null;
  uid?: string | undefined | null;
}

export interface UsersDataTypes {
  name?: string | undefined | null;
  email?: string | undefined | null;
  bio?: string | undefined | null;
  id?: string | undefined;
  imgUrl?: string;
}

export interface UserState {
  user: UserInterface | null;
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
