import { ActionType } from './store';
import { getUserDataById } from '../api/api';

const ADD_DATA = 'user/ADD_DATA', TOGGLE_FETCHING = 'user/TOGGLE_FETCHING', SET_TOKEN = 'SET_TOKEN', TOGGLE_AUTH = 'TOGGLE_AUTH';

type UserActionType = 
    | ActionType<typeof ADD_DATA, {data: iUser}>
    | ActionType<typeof TOGGLE_FETCHING, {data: boolean}>
    | ActionType<typeof SET_TOKEN, {token: string}>
    | ActionType<typeof TOGGLE_AUTH, {isAuth: boolean}>

interface iUser {
    name: string
    email: string
    userId: string | number
}

export interface iUserState {
    user: iUser
    token: string
    isAuth: boolean
    isFetching: boolean
}

let intialState: iUserState = {
    user: {
        name: '',
        email: '',
        userId: ''
    },
    token: '',
    isAuth: false,
    isFetching: true
}

const userReducer = (state = intialState, action: UserActionType): iUserState => {
    switch(action.type) {
        case ADD_DATA:
            return {
                ...state,
                user: { 
                    ...action.data
                }
            }
        case SET_TOKEN:
            return {
                ...state,
                token: action.token
            }
        case TOGGLE_FETCHING:
            return {
                ...state,
                isFetching: action.data
            }
        case TOGGLE_AUTH:
            return {
                ...state,
                isAuth: action.isAuth
            }
        default:
            return state
    }
}

// Actions
const setUserDataAction = (data: iUser): UserActionType => ({ type: ADD_DATA, data });
const toggleIsFetching = (data: boolean): UserActionType => ({ type: TOGGLE_FETCHING, data });
const toggleIsAuth = (isAuth: boolean): UserActionType => ({ type: TOGGLE_AUTH, isAuth });
const setTokenAction = (token: string): UserActionType => ({ type: SET_TOKEN, token });

export const getUserDataAction = (token: string, userId: string | number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));    

    if(token && userId) {
        dispatch(localStorage.setItem('storeMe&', JSON.stringify({ userId, token })));
        dispatch(setTokenAction(token));
        dispatch(toggleIsFetching(false));
    
        let res: iUser = await getUserDataById(userId);

        dispatch(setUserDataAction(res));
    }

    dispatch(toggleIsAuth(false));
    dispatch(toggleIsFetching(false));
}

export default userReducer;