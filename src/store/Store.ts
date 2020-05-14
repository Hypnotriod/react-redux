import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { UserCredentials } from './user/UserCredentials';
import userCredentialsReducer from './user/UserCredentialsReducer';

/**
 *
 * @author Ilya Pikin
 */

export interface ApplicationState {
    userCredentials: UserCredentials;
}

export default createStore(
    combineReducers<ApplicationState>({
        userCredentials: userCredentialsReducer,
    }),
    applyMiddleware(thunk));
