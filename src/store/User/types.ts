import {
  SET_USER,
  CLEAR_USER,
  SET_TOKEN,
  CLEAR_TOKEN,
  UPDATE_USER_DATA,
} from 'store/constan';

export interface UserInterface {
  name?: string | undefined | null;
  email?: string | undefined | null;
  phone?: string | undefined | null;
  imgUrl?: string | undefined | null;
}

export interface UserState {
  user: UserInterface | null;
  token: null | undefined | string;
}

export interface UpdateUser {
  type: typeof UPDATE_USER_DATA;
  payload: UserInterface;
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
  | UpdateUser;
