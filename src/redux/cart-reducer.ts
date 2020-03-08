import { iDataItem, ActionType } from './store';
import { getCartData, setCartData } from '../api/api';

const ADD_DATA = 'cart/ADD_DATA', TOGGLE_FETCHING = 'cart/TOGGLE_FETCHING', DELETE_ITEM = 'cart/DELETE_ITEM';
const SET_ITEM_WAITING_LIST = 'SET_ITEM_WAITING_LIST', SET_ITEM_PRODUCTS = 'SET_ITEM_PRODUCTS'

type CartActionType = 
    | ActionType<typeof ADD_DATA, {data: iCartData}>
    | ActionType<typeof TOGGLE_FETCHING, {data: boolean}>
    | ActionType<typeof SET_ITEM_WAITING_LIST, {item: iDataItem}>
    | ActionType<typeof SET_ITEM_PRODUCTS, {item: iDataItem}>
    | ActionType<typeof DELETE_ITEM, {id: string | number}>

export interface iCartState {
    data: iCartData
    totalSum: number
    isFetching: boolean
}

interface iCartData {
    products: iDataItem[]
    waitingList: iDataItem[]
}

let initialState: iCartState = {
    data: {
        products: [],
        waitingList: []
    },
    totalSum: 0,
    isFetching: true
}

const cartReducer = (state = initialState, action: CartActionType): iCartState => {
    switch(action.type) {
        case ADD_DATA:
            return {
                ...state,
                data: {
                    ...action.data
                }
            }
        case SET_ITEM_PRODUCTS:
            debugger;

            return {
                ...state,
                data: {
                    ...state.data,
                    products: [
                        ...state.data.products,
                        action.item
                    ]
                },
                totalSum: state.totalSum + action.item.price
            }
        case SET_ITEM_WAITING_LIST:
            debugger;

            return {
                ...state,
                data: {
                    ...state.data,
                    waitingList: [
                        ...state.data.waitingList,
                        action.item
                    ]
                },
                totalSum: state.totalSum - action.item.price
            }   
        case TOGGLE_FETCHING:
            return {
                ...state,
                isFetching: action.data
            }
        case DELETE_ITEM:
            let newData: any = state.data.products.filter((i: iDataItem) => i.id !== action.id);

            return {
                ...state,
                data: {
                    ...newData
                }
            }
        default:
            return state;
    }
}

export const setCartDataAction = (data: iCartData): CartActionType => ({type: ADD_DATA, data});
export const toggleFetching = (data: boolean): CartActionType => ({type: TOGGLE_FETCHING, data});
export const setOneItemToProducts = (item: iDataItem): CartActionType => ({type: SET_ITEM_PRODUCTS, item});
export const setOneItemToWaitingList = (item: iDataItem): CartActionType => ({type: SET_ITEM_WAITING_LIST, item});
export const deleteItemAction = (id: string | number): CartActionType => ({type: DELETE_ITEM, id});

export const getCartDataAction = (token: string) => async (dispatch: any) => {
    let res: iCartData = await getCartData(token);

    console.log(res)

    if(res === undefined) {
        let newRes: iCartData = await setCartData([], [], token);

        console.log(newRes)
        dispatch(setCartDataAction(newRes))
    }
}

export const updateCartDataAction = (products: any, waititngList: any,token: string) => async (dispatch: any) => {
    let res = await setCartData(products, waititngList, token);

    console.log(res)
}

export default cartReducer;