export const SET_LOADING = 'SET_LOADING';
export const STOP_LOADING = 'STOP_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

interface SetLoadingType {
  type: typeof SET_LOADING;
}
interface SetStopLoadingType {
  type: typeof STOP_LOADING;
}

interface SetErroType {
  type: typeof SET_ERROR;
  payload: string;
}

interface SetClearErrorType {
  type: typeof CLEAR_ERROR;
}

export type UiActionType =
  | SetLoadingType
  | SetStopLoadingType
  | SetErroType
  | SetClearErrorType;
