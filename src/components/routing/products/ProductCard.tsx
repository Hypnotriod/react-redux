import React from 'react';
import Product from '../../../store/product/Product';

/**
 *
 * @author Ilya Pikin
 */

const ProductCard: React.FunctionComponent<{ product: Product }> = (props) => {

    return (
        <div className='col s12 m12 l6'>
            <div className='card grey lighten-5'>
                <div className='card-content'>
                    <span className='card-title activator'>{props.product.name}
                        <i className='material-icons right'>more_vert</i></span>
                    <span>({props.product.type})</span>
                </div>
                <div className='card-reveal'>
                    <span className='card-title grey-text text-darken-4'>{props.product.name}
                        <i className='material-icons right'>close</i></span>
                    <h6>{props.product.description}</h6>
                </div>
                <div className='card-action white-text grey darken-3'>
                    <span>{props.product.price} {props.product.currency} / {props.product.units}</span>
                    <span className='right'>{props.product.inStockQuantity} {props.product.units} left</span>
                </div>
            </div>
        </div>

    );
};

export default ProductCard;
