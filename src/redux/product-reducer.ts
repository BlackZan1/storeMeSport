import { ActionType, iDataItem } from "./store";
import { getProductById } from "../api/api";

const ADD_DATA = 'product/ADD_DATA', TOGGLE_FETCHING = 'product/TOGGLE_FETCHING';

type ProductActionType = 
    | ActionType<typeof ADD_DATA, {data: iDataItem}>
    | ActionType<typeof TOGGLE_FETCHING, {data: boolean}>

export interface iProductState {
    product: iDataItem | object,
    isFetching: boolean
}

let initialState: iProductState = {
    product: {},
    isFetching: true
}

const productReducer = (state = initialState, action: ProductActionType) => {
    switch(action.type) {
        case ADD_DATA:
            return {
                ...state,
                product: action.data
            }
        case TOGGLE_FETCHING:
            return {
                ...state,
                isFetching: action.data
            }
        default:
            return state;
    }
}

const setProductDataAction = (data: iDataItem): ProductActionType => ({type: ADD_DATA, data});
const toggleIsFetching = (data: boolean): ProductActionType => ({type: TOGGLE_FETCHING, data});

export const getProductDataAction = (id: number | string) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));

    let res = await getProductById(id);

    console.log(res);

    dispatch(setProductDataAction(res));
    dispatch(toggleIsFetching(false));
}

export default productReducer;