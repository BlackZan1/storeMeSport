import Axios from 'axios';

const instance = Axios.create({
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

export const getUserDataById = async (id: string | number) => {
    let res = await instance.get(`/api/user/${id}`);

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
    