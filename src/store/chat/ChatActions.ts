import {BaseChatTypes, ChatAllTypes} from './type';

export const setchatAction = (data: ChatAllTypes[]): BaseChatTypes => ({
  type: 'SET_CHAT',
  payload: data,
});

export const clearChatActions = (): BaseChatTypes => ({
  type: 'CLEAR_CHAT',
});
