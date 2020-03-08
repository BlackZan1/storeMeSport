import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { iDataItem, iState } from '../../redux/store';
import { getProductDataAction } from '../../redux/product-reducer';
import Product from './Product';
import { BigLoader } from '../../assets/Loader';
import { setOneItemToProducts } from '../../redux/cart-reducer';

interface ProductContainerProps {
    product: iDataItem
    isFetching: boolean
    match: any,
    getProductDataAction: (id: number | string) => void
    setOneItemToProducts: (item: iDataItem) => void
}

const ProductContainer: React.FC<ProductContainerProps> = ({match, product, isFetching, getProductDataAction, setOneItemToProducts}) => {
    useEffect(() => {
        getProductDataAction(match.params.id);
    }, [getProductDataAction, match.params.id])

    return (
        <>
            {
                isFetching ? 
                <BigLoader />
                :
                <Product product={product} setOneItemToProducts={setOneItemToProducts} />
            }
        </>
    )
}

let mapStateToProps = (state: iState) => ({
    product: state.dataProduct.product,
    isFetching: state.dataProduct.isFetching
});

let ComposedComponent: any = compose(
    withRouter,
    connect(mapStateToProps, {getProductDataAction, setOneItemToProducts})
)(ProductContainer);

export default ComposedComponent;