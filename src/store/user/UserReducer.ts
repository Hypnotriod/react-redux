import { UserState } from './UserState';
import { UserActions } from './UserActions';
import StoreActionTypes from '../StoreTypes';
import AuthorizationResult from '../../dto/AuthorizationResult';
import HttpStatusCode from '../../constants/HttpStatusCode';
import ServerResponseResult from '../../dto/ServerResponseResult';
import localStorageService from '../../services/LocalStorageService';

const LOCAL_STORAGE_KEY: string = 'user_state';

const defaultState: UserState = localStorageService.getFromLocalStorage({
    authenticationToken: null,
    refreshToken: null,
    login: null,
    authorizationGranted: false,
    authenticationError: false,
}, LOCAL_STORAGE_KEY);

const userReducer = (
    state: UserState = defaultState,
    action: UserActions): UserState => {
    switch (action.type) {
        case StoreActionTypes.USER_LOGIN:
            return localStorageService.saveToLocalStorage(
                handleLogin(state, action.payload), LOCAL_STORAGE_KEY);
        case StoreActionTypes.USER_REFRESH_TOKEN:
            return localStorageService.saveToLocalStorage(
                handleRefreshToken(state, action.payload), LOCAL_STORAGE_KEY);
        case StoreActionTypes.USER_LOGOUT:
            return localStorageService.saveToLocalStorage(
                handleLogout(state, action.payload), LOCAL_STORAGE_KEY);
        default:
            return state;
    }
};

function handleLogin(state: UserState, payload: AuthorizationResult): UserState {
    if (payload.httpStatusCode === HttpStatusCode.OK) {
        return {
            ...state,
            authenticationToken: payload.authenticationToken!,
            refreshToken: payload.refreshToken!,
            login: payload.login!,
            authorizationGranted: payload.authorizationGranted,
            authenticationError: false,
        };
    } else {
        return {
            ...state,
            authorizationGranted: payload.authorizationGranted,
            authenticationError: true,
        };
    }
}

function handleRefreshToken(state: UserState, payload: AuthorizationResult): UserState {
    return {
        ...state,
        authenticationToken: payload.authenticationToken!,
        refreshToken: payload.refreshToken!,
    };
}

function handleLogout(state: UserState, payload: ServerResponseResult): UserState {
    return {
        ...state,
        authenticationToken: null,
        refreshToken: null,
        login: null,
        authorizationGranted: false,
        authenticationError: false,
    };
}

export default userReducer;
