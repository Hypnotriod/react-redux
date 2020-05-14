import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { UserCredentials } from './user/UserCredentials';
import userReducer from './user/UserReducer';

export interface ApplicationState {
    userCredentials: UserCredentials;
}

export default createStore(
    combineReducers<ApplicationState>({
        userCredentials: userReducer,
    }),
    applyMiddleware(thunk));
