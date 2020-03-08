import React from 'react';
import { connect } from 'react-redux';
import { iState } from '../../../redux/store';
import CartPage from './CartPage';
import { BigLoader } from '../../../assets/Loader';

interface CartPageContainerProps {
    isAuth: boolean
}

const CartPageContainer: React.FC<CartPageContainerProps> = ({ isAuth }) => {
    return <>
        {
            isAuth ?
            <CartPage />
            :
            <BigLoader />
        }
    </>
}

let mapStateToProp = (state: iState) => ({
    isAuth: state.user.isAuth
})

connect(mapStateToProp, {})(CartPageContainer)

export default CartPageContainer;