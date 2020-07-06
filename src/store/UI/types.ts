import {
  SET_LOADING,
  STOP_LOADING,
  SET_ERROR,
  CLEAR_ERROR
} from 'store/constan';

export interface UiInterface {
  loading: boolean;
  error: string | undefined;
}

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
