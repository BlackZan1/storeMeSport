import cartReducer, { setCartDataAction, setOneItemToData, iCartState, deleteItemAction } from "../cart-reducer";

let initialState: iCartState = {
    data: [
        {
            id: 10,
            name: 'asdasd',
            madeIn: 'asdasd',
            season: 'asdasd',
            price: 14.99,
            description: 'asdasd',
            productImagePath: 'asdasd',
            category: 'asdasd'
        },
        {
            id: 12,
            name: 'asdasd',
            madeIn: 'asdasd',
            season: 'asdasd',
            price: 14.99,
            description: 'asdasd',
            productImagePath: 'asdasd',
            category: 'asdasd'
        },
        {
            id: 13,
            name: 'asdasd',
            madeIn: 'asdasd',
            season: 'asdasd',
            price: 14.99,
            description: 'asdasd',
            productImagePath: 'asdasd',
            category: 'asdasd'
        }
    ],
    totalSum: 0,
    isFetching: true
}

test('add data to cart', () => {
    let action = setCartDataAction([]);

    let newState = cartReducer(initialState, action);

    expect(newState.data.length).toBe(0);
});

test('add one item to cart', () => {
    let action = setOneItemToData({
        id: 14,
        name: 'asdasd',
        madeIn: 'asdasd',
        season: 'asdasd',
        price: 14.99,
        description: 'asdasd',
        productImagePath: 'asdasd',
        category: 'asdasd'
    });

    let newState = cartReducer(initialState, action);

    expect(newState.data.length).toBe(4);
})

test('delete one item from cart', () => {
    let action = deleteItemAction(10);

    let newState = cartReducer(initialState, action);

    expect(newState.data.length).toBe(2);
})