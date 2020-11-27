import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {UiReducer} from './UI';
import {UserReducer} from './User';
import {chatReducer} from './chat';

const reducer = combineReducers({
  UI: UiReducer,
  User: UserReducer,
  Chat: chatReducer
});

export type RootState = ReturnType<typeof reducer>;

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
