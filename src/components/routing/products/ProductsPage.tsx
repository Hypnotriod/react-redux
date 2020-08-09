import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '../../../store/Store';
import { UserCredentials } from '../../../store/user/UserCredentials';
import { getAllProductsAction } from '../../../store/product/ProductsActions';
import Products from '../../../store/product/Products';

/**
 *
 * @author Ilya Pikin
 */

const ProductsPage: React.FunctionComponent = () => {
    const products: Products = useSelector((state: ApplicationState) => state.products);
    const userCredentials: UserCredentials = useSelector((state: ApplicationState) => state.userCredentials);
    const dispatch = useDispatch();

    const onUeserCredentialsUpdate = () => {
        if (!products.isReady) {
            return;
        }
        if (userCredentials.refreshToken && !userCredentials.authorizationGranted) {
            return;
        }
        dispatch(
            getAllProductsAction(
                userCredentials.authenticationToken,
                userCredentials.refreshToken));
    };

    useEffect(onUeserCredentialsUpdate, [userCredentials]);

    return (
        <div className='section'>
            <h5 className='center-align'>Products</h5>
            <div className='row'>
                {products.products.map(product => <ProductCard product={product} key={product.id} />)}
            </div>
        </div>
    );
};

export default ProductsPage;
