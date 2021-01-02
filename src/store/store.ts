import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';

import {chatReducer} from './chat';
import {UiReducer} from './UI';
import {UserReducer} from './User';

const reducer = combineReducers({
  UI: UiReducer,
  User: UserReducer,
  Chat: chatReducer
});

export type RootState = ReturnType<typeof reducer>;

export const store = createStore(reducer, applyMiddleware(thunk));
