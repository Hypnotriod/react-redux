import StoreActionTypes, { StoreAction } from '../StoreTypes';
import ProductQueryResult from '../../dto/ProductQueryResult';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import apiRequestService from '../../services/ApiRequestService';

/**
 *
 * @author Ilya Pikin
 */

export type ProductsAction =
    StoreAction<StoreActionTypes.PRODUCTS_GET_ALL, ProductQueryResult[]>;

export function getAllProductsAction(authenticationToken: string | null, refreshToken: string | null): any {
    return async (dispatch: ThunkDispatch<ProductsAction, undefined, Action>) => {
        try {
            const result = await apiRequestService.sendGetAllProductsRequest(authenticationToken, refreshToken, dispatch);
            dispatch({
                type: StoreActionTypes.PRODUCTS_GET_ALL,
                payload: result.data.data,
            });
        } catch (error) {
            // TODO
        }
    };
}
