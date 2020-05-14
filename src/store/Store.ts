import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { UserCredentials } from './user/UserCredentials';
import userCredentialsReducer from './user/UserCredentialsReducer';
import Product from './product/Product';
import productsReducer from './product/ProductsReducer';

/**
 *
 * @author Ilya Pikin
 */

export interface ApplicationState {
    userCredentials: UserCredentials;
    products: Product[];
}

export default createStore(
    combineReducers<ApplicationState>({
        userCredentials: userCredentialsReducer,
        products: productsReducer,
    }),
    applyMiddleware(thunk));
