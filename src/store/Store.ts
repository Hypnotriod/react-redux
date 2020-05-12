import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { UserState } from './user/UserState';
import userReducer from './user/UserReducer';

export type Store = {
    user: UserState,
};

export const store = createStore(combineReducers({
    user: userReducer,
}), applyMiddleware(thunk));
