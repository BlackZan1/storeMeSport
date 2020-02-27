import { createStore, combineReducers, applyMiddleware, Action } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import storeReducer, { iStoreState } from './store-reducer';
import productReducer, { iProductState } from './product-reducer';
import cartReducer, { iCartState } from './cart-reducer';
import { FormReducer, reducer } from 'redux-form';
import userReducer, { iUserState } from './user-reducer';

export interface ThunkDispatch<S, E, A extends Action> {
    <T extends A>(action: T): T;
    <R>(asyncAction: ThunkAction<R, S, E, A>): R;
}

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
    user: iUserState
}

const rootReducer = combineReducers({
    store: storeReducer,
    dataProduct: productReducer,
    dataCart: cartReducer,
    form: reducer,
    user: userReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;