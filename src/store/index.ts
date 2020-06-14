import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import * as UIReducer from './UI';
import * as UserReducer from './User';

const reducer = combineReducers({
  UI: UIReducer.UiReducer,
  User: UserReducer.UserReducer,
});

export type RootState = ReturnType<typeof reducer>;

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
