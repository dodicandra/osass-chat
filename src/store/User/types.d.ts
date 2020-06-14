export interface UserInterface {
  name: string;
  email: string;
  phone: string;
}

export interface UserState {
  user: UserInterface | null;
  token: null | undefined | string;
}

export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const SET_TOKEN = 'SET_TOKEN';
export const CLEAR_TOKEN = 'CLEAR_TOKEN';
export const SET_LOADING = 'SET_LOADING';
export const STOP_LOADING = 'STOP_LOADING';
export const SET_ERR = 'SET_ERR';
export const CLEAR_ERR = 'CLEAR_ERR';

interface SetUserType {
  type: typeof SET_USER;
  payload: UserInterface;
  token: string;
}

interface ClearUserType {
  type: typeof CLEAR_USER;
  payload?: string;
}

interface SetTokeType {
  type: typeof SET_TOKEN;
  payload: string;
}

interface ClearTokenType {
  type: typeof CLEAR_TOKEN;
  payload?: string;
}

export type UserActionType =
  | SetUserType
  | ClearUserType
  | SetTokeType
  | ClearTokenType;
