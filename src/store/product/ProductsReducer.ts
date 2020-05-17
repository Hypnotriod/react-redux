import { ProductsAction } from './ProductsActions';
import StoreActionTypes from '../StoreTypes';
import Products from './Products';

/**
 *
 * @author Ilya Pikin
 */

const productsReducer = (
    state: Products = {
        products: [],
        isReady: true,
    },
    action: ProductsAction): Products => {
    switch (action.type) {
        case StoreActionTypes.SET_PRODUCTS_STATE:
            return setProductsState(state, action.payload);
        case StoreActionTypes.PRODUCTS_GET_ALL:
            return handleGetAllProducts(action.payload);
        default:
            return state;
    }
};

function setProductsState(state: Products, isReady: boolean): Products {
    return {
        ...state,
        isReady,
    };
}

function handleGetAllProducts(payload: Products): Products {
    return {
        ...payload,
    };
}

export default productsReducer;
