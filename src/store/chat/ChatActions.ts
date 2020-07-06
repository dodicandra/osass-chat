import { BaseChatTypes, ChatDataTypes, ChatHistoryTypes } from './type';

export const setchatAction = (data: ChatDataTypes[]): BaseChatTypes => ({
  type: 'SET_CHAT',
  payload: data
});

export const setChatHistoryAction = (
  data: ChatHistoryTypes[]
): BaseChatTypes => ({
  type: 'SET_CHAT_HISTORY',
  payload: data
});

export const clearChatActions = (): BaseChatTypes => ({
  type: 'CLEAR_CHAT'
});
