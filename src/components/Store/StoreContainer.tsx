import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Store from './Store';
import { LoadDataAction } from '../../redux/store-reducer';
import { iDataItem, iState } from '../../redux/store';
import { BigLoader } from '../../assets/Loader';
import './Store.sass';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Layout } from 'antd';
import SearchContainer from '../Search/SearchContainer';

interface StoreConnectorProps {
    data: iDataItem[]
    cart: iDataItem[]
    totalSum: number
    isFetching: boolean
    LoadDataAction: () => void
    match: any
}

const StoreContainer: React.FC<StoreConnectorProps> = ({ data, cart, isFetching, LoadDataAction, match, totalSum }) => {
    let [storeProducts, setStoreProducts] = useState<iDataItem[]>(data)

    useEffect(() => {
        LoadDataAction();
    }, [LoadDataAction, match.params.category])

    const fitlerProductsProps = (data: iDataItem[], category: string) => {
        if(category === 'products') return data;

        return data.filter((p: iDataItem) => p.category.toLowerCase() === category.toLowerCase());
    }

    useEffect(() => {
        if(data.length) {
            setStoreProducts(fitlerProductsProps(data, match.params.category));
        }
    }, [data, match.params.category])

    return <>
        {
            isFetching ? 
            <BigLoader />
            :
            <Layout.Content>
                <SearchContainer />
                
                <Store products={ storeProducts } cart={ cart } totalSum={ totalSum } />
            </Layout.Content>
        }
    </>
}       

let mapStateToProps = (state: iState) => ({
    data: state.store.data,
    cart: state.dataCart.data.products,
    isFetching: state.store.isFetching
})

let ComposedComponent: any = compose(
    withRouter, 
    connect(mapStateToProps, { LoadDataAction })
)(StoreContainer);

export default ComposedComponent;