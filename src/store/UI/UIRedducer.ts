import {UiActionType} from './types';

export interface UiInterface {
  loading: boolean;
  error: string | undefined;
}

const initalState: UiInterface = {
  loading: false,
  error: '',
};

export function UiReducer(
  state = initalState,
  action: UiActionType,
): UiInterface {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'STOP_LOADING':
      return {
        ...state,
        loading: false,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'CLEAR_ERROR':
      return state;
    default:
      throw Error();
  }
}
