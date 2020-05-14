import Product from './Product';
import { ProductsAction } from './ProductsActions';
import StoreActionTypes from '../StoreTypes';
import ProductQueryResult from '../../dto/ProductQueryResult';

/**
 *
 * @author Ilya Pikin
 */

const productsReducer = (
    state: Product[] = [],
    action: ProductsAction): Product[] => {
    switch (action.type) {
        case StoreActionTypes.PRODUCTS_GET_ALL:
            return handleGetAllProducts(action.payload);
        default:
            return state;
    }
};

function handleGetAllProducts(payload: ProductQueryResult[]): Product[] {
    return payload.map(v => ({
        ...v,
    }));
}

export default productsReducer;
