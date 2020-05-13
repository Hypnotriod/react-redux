import { Action } from 'redux';
import { StoreAction } from '../StoreTypes';
import StoreActionTypes from '../StoreTypes';
import { ThunkDispatch } from 'redux-thunk';
import AuthorizationResult from '../../dto/AuthorizationResult';
import ServerResponseResult from '../../dto/ServerResponseResult';
import requestService from '../../services/ApiRequestService';
import { AxiosError } from 'axios';

export type UserActions =
    StoreAction<StoreActionTypes.USER_LOGIN, AuthorizationResult> |
    StoreAction<StoreActionTypes.USER_REFRESH_TOKEN, AuthorizationResult> |
    StoreAction<StoreActionTypes.USER_LOGOUT, ServerResponseResult>;

export function userLogInAction(login: string, password: string): any {
    return async (dispatch: ThunkDispatch<UserActions, undefined, Action>) => {
        try {
            const result = await requestService.sendLogInRequest(login, password);
            dispatch({
                type: StoreActionTypes.USER_LOGIN,
                payload: {
                    ...result.data,
                    login,
                },
            });
        } catch (error) {
            dispatch({
                type: StoreActionTypes.USER_LOGIN,
                payload: {
                    httpStatusCode: Number((error as AxiosError).code),
                    authorizationGranted: false,
                },
            });
        }
    };
}

export function userLogOutAction(authenticationToken: string, refreshToken: string): any {
    return async (dispatch: ThunkDispatch<UserActions, undefined, Action>) => {
        try {
            await requestService.sendLogOutRequest(authenticationToken, refreshToken, dispatch);
        } finally {
            dispatch({
                type: StoreActionTypes.USER_LOGOUT,
            });
        }
    };
}

