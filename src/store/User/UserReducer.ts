import {UserActionType, UserState} from './types';

const initialState: UserState = {
  user: null,
  token: null,
};

export function UserReducer(
  state = initialState,
  action: UserActionType,
): UserState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        token: action.token,
      };
    case 'CLEAR_USER':
      return {
        ...state,
        user: null,
        token: null,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'CLEAR_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
}
