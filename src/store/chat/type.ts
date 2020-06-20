import {
  SET_CHAT,
  SET_CHAT_HISTORY,
  CLEAR_CHAT,
  CLEAR_CHAT_HISTORY,
} from './constan';

export interface ChatDataTypes {
  id?: string;
  tanggal: string;
  time: string;
  content: string;
  sender: string | boolean;
}

export interface ChatHistoryTypes {
  chatKey: string;
  lastchat: ChatDataTypes[];
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

export type BaseChatTypes =
  | ChatTypes
  | ChatHistory
  | ClearChat
  | ClearHistoryChat;
