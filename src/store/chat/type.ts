import {
  SET_CHAT,
  SET_CHAT_HISTORY,
  CLEAR_CHAT,
  CLEAR_CHAT_HISTORY,
} from './constan';

export interface ChatDataTypes {
  id?: string;
  tanggal: string | undefined | null;
  time: string | undefined | null;
  content: string | undefined | null;
  sender: string | boolean;
}

export interface ChatAllTypes {
  tanggal: string | undefined | null;
  data: ChatDataTypes[] | undefined | null;
}

export interface ChatStateType {
  chat: ChatAllTypes[];
  history?: string[];
}

interface ChatTypes {
  type: typeof SET_CHAT;
  payload: ChatAllTypes[];
}

interface ChatHistory {
  type: typeof SET_CHAT_HISTORY;
  payload: ChatAllTypes[];
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
