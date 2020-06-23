import {UserActionType, UserState} from './types';

const initialState: UserState = {
  user: {},
  users: [],
  token: null
};

export function UserReducer(
  state = initialState,
  action: UserActionType
): UserState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };
    case 'SET_USERS':
      return {
        ...state,
        users: [...action.payload]
      };
    case 'SEARCH_USER':
      return {
        ...state,
        users: [...action.payload]
      };
    case 'UPDATE_USER_DATA':
      return {
        ...state,
        user: {...state.user, ...action.payload}
      };
    case 'CLEAR_USER':
      return {
        ...state,
        user: {},
        token: null
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload
      };
    case 'CLEAR_TOKEN':
      return {
        ...state,
        token: null
      };
    default:
      return state;
  }
}
