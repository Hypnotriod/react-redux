import StoreActionTypes, { StoreAction } from '../StoreTypes';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import apiRequestService from '../../services/ApiRequestService';
import Products from './Products';

/**
 *
 * @author Ilya Pikin
 */

export type ProductsAction =
    StoreAction<StoreActionTypes.SET_PRODUCTS_STATE, boolean> |
    StoreAction<StoreActionTypes.PRODUCTS_GET_ALL, Products>;

export function getAllProductsAction(authenticationToken: string | null, refreshToken: string | null): any {
    return async (dispatch: ThunkDispatch<ProductsAction, undefined, Action>) => {
        try {
            dispatch({
                type: StoreActionTypes.SET_PRODUCTS_STATE,
                payload: false,
            });
            const result = await apiRequestService.sendGetAllProductsRequest(authenticationToken, refreshToken, dispatch);
            dispatch({
                type: StoreActionTypes.PRODUCTS_GET_ALL,
                payload: {
                    products: result.data.data,
                    isReady: true,
                },
            });
        } catch (error) {
            dispatch({
                type: StoreActionTypes.SET_PRODUCTS_STATE,
                payload: true,
            });
        }
    };
}
