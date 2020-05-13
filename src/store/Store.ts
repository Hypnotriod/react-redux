import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { UserState } from './user/UserState';
import userReducer from './user/UserReducer';

export interface ApplicationState {
    userState: UserState;
}

export default createStore(
    combineReducers<ApplicationState>({
        userState: userReducer,
    }),
    applyMiddleware(thunk));
