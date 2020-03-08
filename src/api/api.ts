import Axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = Axios.create({
    baseURL: 'http://localhost:3033/'
})

export const getProducts = async () => {
    let res = await instance.get('/api/products');

    return res.data.products;
}

export const getProductById = async (id: number | string) => {
    let res = await instance.get(`/api/products/${id}`);

    return res.data.product;
}

export const getProductSearchByName = async (name: string) => {
    let res = await instance.get(`/api/products/search/${name}`);

    return res.data.products;
}

export const getUserData = async (token: string) => {
    let res = await instance.get(`/api/user/me`, { params: {}, headers: {
        Authorization: `Bearer ${token}`
    } })

    return res.data;
}

export const signUp = async (email: string, name: string, password: string) => {
    let res = await instance.post(`/api/auth/signUp`, { email, name, password });

    return res.data;
}

export const login = async (email: string, password: string) => {
    let res = await instance.post('/api/auth/login', { email, password });

    return res.data;
}

export const getCartData = async (token: string) => {
    let res = await instance.get('/api/cart', { params: {}, headers: {
        Authorization: `Bearer ${token}`
    }})

    console.log(res)

    return res.data.cart
}

export const setCartData = async (products: any, waitingList: any, token: string) => {
    let res = await instance.post('/api/cart', { products, waitingList }, { params: {}, headers: {
        Authorization: `Bearer ${token}`
    }})

    console.log(res)

    return res.data.cart
}
    