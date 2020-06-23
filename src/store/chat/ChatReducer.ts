import {BaseChatTypes, ChatStateType} from './type';

const initialState: ChatStateType = {
  chat: [],
  history: []
};

export const chatReducer = (
  state = initialState,
  action: BaseChatTypes
): ChatStateType => {
  switch (action.type) {
    case 'SET_CHAT':
      return {
        ...state,
        chat: [...action.payload]
      };
    case 'CLEAR_CHAT':
      return {
        ...state,
        chat: []
      };
    case 'SET_CHAT_HISTORY':
      return {
        ...state,
        history: [...action.payload]
      };
    case 'CLEAR_ALL':
      return initialState;
    default:
      return state;
  }
};
