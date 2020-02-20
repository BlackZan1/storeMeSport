import { getProducts, getProductSearchByName } from "../api/api";
import { iDataItem, ActionType } from "./store";

const ADD_DATA = 'store/ADD_DATA';
const TOGGLE_FETCHING = 'store/TOGGLE_FETCHING';

export interface iStoreState {
    isFetching: boolean
    data: iDataItem[] | iDataItem
}

type StoreActionType =
    | ActionType<typeof ADD_DATA, { data: iDataItem[] | [] }>
    | ActionType<typeof TOGGLE_FETCHING, { data: boolean }>

let initialState: iStoreState = {
    isFetching: true,
    data: []
}

// Reducer
const storeReducer = (state = initialState, action: StoreActionType) => {
    switch(action.type) {
        case ADD_DATA:
            return {
                ...state,
                data: action.data
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

// Actions
const setStoreDataAction = (data: iDataItem[]): StoreActionType => ({type: ADD_DATA, data});
const toggleIsFetching = (data: boolean): StoreActionType => ({type: TOGGLE_FETCHING, data});

// Thunk Actions
export const LoadDataAction = () => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));

    let res: iDataItem[] = await getProducts();

    dispatch(setStoreDataAction(res));
    dispatch(toggleIsFetching(false));
}

export const SearchByNameAction = (name: string) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));

    let res: iDataItem[] = await getProductSearchByName(name);

    dispatch(setStoreDataAction(res.length ? res : []));
    dispatch(toggleIsFetching(false));
}

export default storeReducer;