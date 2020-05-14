import { UserCredentials } from './UserCredentials';
import { UserActions } from './UserActions';
import StoreActionTypes from '../StoreTypes';
import AuthorizationResult from '../../dto/AuthorizationResult';
import HttpStatusCode from '../../constants/HttpStatusCode';
import ServerResponseResult from '../../dto/ServerResponseResult';
import localStorageService from '../../services/LocalStorageService';

const LOCAL_STORAGE_REFRESH_TOKEN_KEY: string = 'token';

const defaultState: UserCredentials = {
    authenticationToken: null,
    refreshToken: localStorageService.get<string | null>(null, LOCAL_STORAGE_REFRESH_TOKEN_KEY),
    login: null,
    authorizationGranted: false,
    authenticationError: false,
};

const userReducer = (
    state: UserCredentials = defaultState,
    action: UserActions): UserCredentials => {
    switch (action.type) {
        case StoreActionTypes.USER_LOGIN:
            return handleUserLogin(state, action.payload);
        case StoreActionTypes.USER_REFRESH_TOKEN:
            return handleUserRefreshToken(state, action.payload);
        case StoreActionTypes.USER_LOGOUT:
            return handleUserLogout(state, action.payload);
        default:
            return state;
    }
};

function handleUserLogin(state: UserCredentials, payload: AuthorizationResult): UserCredentials {
    if (payload.httpStatusCode === HttpStatusCode.OK) {
        localStorageService.save<string>(payload.refreshToken!, LOCAL_STORAGE_REFRESH_TOKEN_KEY);
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

function handleUserRefreshToken(state: UserCredentials, payload: AuthorizationResult): UserCredentials {
    localStorageService.save<string>(payload.refreshToken!, LOCAL_STORAGE_REFRESH_TOKEN_KEY);
    return {
        ...state,
        authenticationToken: payload.authenticationToken!,
        refreshToken: payload.refreshToken!,
        login: payload.login!,
        authorizationGranted: payload.authorizationGranted,
        authenticationError: false,
    };
}

function handleUserLogout(state: UserCredentials, payload: ServerResponseResult): UserCredentials {
    localStorageService.save(null, LOCAL_STORAGE_REFRESH_TOKEN_KEY);
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
