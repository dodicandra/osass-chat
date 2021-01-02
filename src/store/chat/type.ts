import {SET_CHAT, SET_CHAT_HISTORY, CLEAR_CHAT, CLEAR_CHAT_HISTORY, CLEAR_ALL} from './constan';

export interface ChatDataTypes {
  uid?: string;
  tanggal: string;
  time: string;
  content: string;
  sender: string | boolean;
}

export interface LastChatTDataTypes {
  content: string;
  sender: string;
  tanggal: string;
  time: string;
  uid: string;
}
export interface ChatHistoryTypes {
  chatKey: string;
  uid: string;
  lastchat: ChatDataTypes;
  bio: string;
  imgUrl: string;
  name: string;
  createAt: string;
}

export interface ChatAllTypes {
  tanggal: string;
  data: ChatDataTypes[];
}

export interface ChatStateType {
  chat: ChatDataTypes[];
  history: ChatHistoryTypes[];
}

interface ChatTypes {
  type: typeof SET_CHAT;
  payload: ChatDataTypes[];
}

interface ChatHistory {
  type: typeof SET_CHAT_HISTORY;
  payload: ChatHistoryTypes[];
}

interface ClearChat {
  type: typeof CLEAR_CHAT;
  payload?: string;
}

interface ClearHistoryChat {
  type: typeof CLEAR_CHAT_HISTORY;
  payload?: string;
}

interface ClearAll {
  type: typeof CLEAR_ALL;
}

export type BaseChatTypes = ChatTypes | ChatHistory | ClearChat | ClearHistoryChat | ClearAll;
