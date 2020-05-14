import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '../../../store/Store';
import { UserCredentials } from '../../../store/user/UserCredentials';
import { getAllProductsAction } from '../../../store/product/ProductsActions';

/**
 *
 * @author Ilya Pikin
 */

const ProductsPage: React.FunctionComponent = () => {
    const products = useSelector((state: ApplicationState) => state.products);
    const userCredentials: UserCredentials = useSelector((state: ApplicationState) => state.userCredentials);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userCredentials.refreshToken && !userCredentials.login) {
            return;
        }
        dispatch(
            getAllProductsAction(
                userCredentials.authenticationToken,
                userCredentials.refreshToken));
    }, [userCredentials, dispatch]);

    return (
        <div className='section'>
            <h5 className='center-align'>Products</h5>
            <div className='row'>
                {products.map(product => <ProductCard product={product} key={product.id} />)}
            </div>
        </div>
    );
};

export default ProductsPage;
