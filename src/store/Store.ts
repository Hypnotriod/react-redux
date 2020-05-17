import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { UserCredentials } from './user/UserCredentials';
import userCredentialsReducer from './user/UserCredentialsReducer';
import productsReducer from './product/ProductsReducer';
import Products from './product/Products';

/**
 *
 * @author Ilya Pikin
 */

export interface ApplicationState {
    userCredentials: UserCredentials;
    products: Products;
}

export default createStore(
    combineReducers<ApplicationState>({
        userCredentials: userCredentialsReducer,
        products: productsReducer,
    }),
    applyMiddleware(thunk));
