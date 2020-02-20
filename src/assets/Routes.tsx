import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import StoreConnector from '../components/Store/StoreContainer';
import ProductContainer from '../components/ProductPage/ProductContainer';

const useRoutes = () => {
    return (
        <Switch>
            <Route path={'/store/:category'} component={StoreConnector} />
            <Route path={'/store/products'} component={StoreConnector} />
            <Route path={'/product/:id'} component={ProductContainer} />

            <Redirect to='/store/products' />
        </Switch>
    )
}

export default useRoutes;