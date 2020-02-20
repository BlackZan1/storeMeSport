import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import storeReducer, { iStoreState } from './store-reducer';
import productReducer, { iProductState } from './product-reducer';
import cartReducer, { iCartState } from './cart-reducer';
import { reducer, FormReducer } from 'redux-form';

export interface iDataItem {
    id: string | number
    name: string
    madeIn: string
    season: string
    price: number
    description: string
    productImagePath: string
    category: string
}

export type ActionType<K, V = void> = V extends void ? {type: K} : {type: K} & V;

export interface iState {
    store: iStoreState
    dataProduct: iProductState
    dataCart: iCartState
    form: FormReducer
}

const rootReducer = combineReducers({
    store: storeReducer,
    dataProduct: productReducer,
    dataCart: cartReducer,
    form: reducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;