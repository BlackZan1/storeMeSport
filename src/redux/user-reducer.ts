import { ActionType } from './store';
import { getUserDataById, signUp, login } from '../api/api';
import { stopSubmit, SubmissionError } from 'redux-form';

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
    isFetching: false
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
    dispatch(toggleIsFetching(false));
    dispatch(toggleIsFetching(true));    

    if(token && userId) {
        dispatch(localStorage.setItem('storeMe&', JSON.stringify({ userId, token })));
        dispatch(setTokenAction(token));
    
        let res: iUser = await getUserDataById(userId);
        
        dispatch(toggleIsFetching(false));
        dispatch(setUserDataAction(res));
    }

    // dispatch(toggleIsAuth(false));
    dispatch(toggleIsFetching(false));
}

export const loginUserAction = (email: string, password: string) => async (dispatch: any) => {
    dispatch(toggleIsFetching(false));
    dispatch(toggleIsFetching(true));

    if(!!email && !!password) {
        dispatch(stopSubmit('signUp', {email: 'Enter your email'})); // Good idea to me
        dispatch(stopSubmit('signUp', {email: 'Enter your password'})); // Good idea to me
    }
    
    let res = await login(email, password);

    if(res.error) {
        console.log(res.message)
    }
    else {
        console.log(res)

        dispatch(toggleIsAuth(true));
        dispatch(toggleIsFetching(false));   
    }
}

export const registerUserAction = (email: string, name: string, password: string) => async (dispatch: any) => {
    dispatch(toggleIsFetching(false));
    dispatch(toggleIsFetching(true));

    let res: any = await signUp(email, name, password);

    if(res.error) {
        dispatch(stopSubmit('signUp', {email: res.message})); // Good idea to me
        dispatch(toggleIsFetching(false)); 
    }
    else {
        dispatch(toggleIsFetching(false));
    }
}

export default userReducer;