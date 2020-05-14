import StoreActionTypes from '../store/StoreTypes';
import HttpStatusCode from '../constants/HttpStatusCode';
import AuthorizationResult from '../dto/AuthorizationResult';
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { Action } from 'redux';
import { UserCredentialsAction } from '../store/user/UserCredentialsActions';
import { ThunkDispatch } from 'redux-thunk';
import { API_REFRESH_TOKEN, API_LOGIN, API_LOGOUT, API_GET_ALL_PRODUCTS } from '../constants/API';
import ServerResponseResult from '../dto/ServerResponseResult';

/**
 *
 * @author Ilya Pikin
 */

class ApiRequestService {
    public sendLogInRequest(login: string, password: string): Promise<AxiosResponse<AuthorizationResult>> {
        return axios.post<AuthorizationResult>(
            API_LOGIN,
            { login, password },
            this.getRequestConfig());
    }

    public sendLogOutRequest(
        authenticationToken: string,
        refreshToken: string,
        dispatch: ThunkDispatch<UserCredentialsAction, undefined, Action>): Promise<AxiosResponse<ServerResponseResult>> {
        return this.wrapWithRefreshTokenRequest<ServerResponseResult>(
            (authenticationToken) => {
                return axios.post<ServerResponseResult>(
                    API_LOGOUT, null, this.getRequestConfigWithAuthToken(authenticationToken));
            },
            dispatch,
            authenticationToken,
            refreshToken,
        );
    }

    public sendRefreshTokenRequest(refreshToken: string): Promise<AxiosResponse<AuthorizationResult>> {
        return axios.post<AuthorizationResult>(
            API_REFRESH_TOKEN,
            { refreshToken },
            this.getRequestConfig());
    }

    public sendGetAllProductsRequest(
        authenticationToken: string | null,
        refreshToken: string | null,
        dispatch: ThunkDispatch<UserCredentialsAction, undefined, Action>): Promise<AxiosResponse<ServerResponseResult>> {
        return this.wrapWithRefreshTokenRequest<ServerResponseResult>(
            (authenticationToken) => {
                return axios.get<ServerResponseResult>(
                    API_GET_ALL_PRODUCTS, this.getRequestConfigWithAuthToken(authenticationToken));
            },
            dispatch,
            authenticationToken,
            refreshToken,
        );
    }

    private async wrapWithRefreshTokenRequest<T>(
        request: (authenticationToken: string | null) => Promise<AxiosResponse<T>>,
        dispatch: ThunkDispatch<UserCredentialsAction, undefined, Action>,
        authenticationToken: string | null,
        refreshToken: string | null): Promise<AxiosResponse<T>> {

        let result: AxiosResponse<T> | null = null;
        let error: AxiosError | null = null;
        let refreshTokenResult: AxiosResponse<AuthorizationResult> | null = null;

        try {
            result = await request(authenticationToken);
        } catch (e) {
            error = e;
        }

        if (error && error.response && error.response.status !== HttpStatusCode.UNAUTHORIZED) {
            throw error;
        } else if (error && !refreshToken) {
            throw error;
        } else if (result) {
            return result;
        }

        try {
            refreshTokenResult = await this.sendRefreshTokenRequest(refreshToken!);
            dispatch({
                type: StoreActionTypes.USER_REFRESH_TOKEN,
                payload: refreshTokenResult,
            });
        } catch (error) {
            throw error;
        }

        return request(refreshTokenResult.data.authenticationToken!);
    }

    private getRequestConfigWithAuthToken(authenticationToken: string | null): AxiosRequestConfig {
        if (authenticationToken) {
            return {
                ...this.getRequestConfig(),
                headers: {
                    'Authorization': authenticationToken,
                },
            };
        } else {
            return this.getRequestConfig();
        }
    }

    private getRequestConfig(): AxiosRequestConfig {
        return {
            headers: {
                'Content-Type': 'application/json',
            },
            responseType: 'json',
        };
    }
}

export default new ApiRequestService();
