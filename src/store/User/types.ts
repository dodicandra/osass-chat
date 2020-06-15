import {SET_USER, CLEAR_USER, SET_TOKEN, CLEAR_TOKEN} from 'store/constan';

export interface UserInterface {
  name: string | undefined | null;
  email: string | undefined | null;
  phone: string | undefined | null;
}

export interface UserState {
  user: UserInterface | null;
  token: null | undefined | string;
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
  | ClearTokenType;
