import { iDataItem, ActionType } from './store';

const ADD_DATA = 'cart/ADD_DATA', TOGGLE_FETCHING = 'cart/TOGGLE_FETCHING', SET_ITEM = 'cart/SET_ITEM', DELETE_ITEM = 'cart/DELETE_ITEM';

type CartActionType = 
    | ActionType<typeof ADD_DATA, {data: iDataItem[]}>
    | ActionType<typeof TOGGLE_FETCHING, {data: boolean}>
    | ActionType<typeof SET_ITEM, {item: iDataItem}>
    | ActionType<typeof DELETE_ITEM, {id: string | number}>

export interface iCartState {
    data: iDataItem[]
    totalSum: number
    isFetching: boolean
}

let initialState: iCartState = {
    data: [],
    totalSum: 0,
    isFetching: true
}

const cartReducer = (state = initialState, action: CartActionType): iCartState => {
    switch(action.type) {
        case ADD_DATA:
            return {
                ...state,
                data: action.data
            }
        case SET_ITEM:
            debugger;

            return {
                ...state,
                data: [...state.data, action.item],
                totalSum: state.totalSum + action.item.price
            }
        case TOGGLE_FETCHING:
            return {
                ...state,
                isFetching: action.data
            }
        case DELETE_ITEM:
            let newData = state.data.filter((i: iDataItem) => i.id !== action.id);

            return {
                ...state,
                data: [...newData]
            }
        default:
            return state;
    }
}

export const setCartDataAction = (data: iDataItem[] | []): CartActionType => ({type: ADD_DATA, data});
export const toggleFetching = (data: boolean): CartActionType => ({type: TOGGLE_FETCHING, data});
export const setOneItemToData = (item: iDataItem): CartActionType => ({type: SET_ITEM, item});
export const deleteItemAction = (id: string | number): CartActionType => ({type: DELETE_ITEM, id});

export default cartReducer;