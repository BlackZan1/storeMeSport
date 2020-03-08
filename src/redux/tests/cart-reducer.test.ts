import cartReducer, { setCartDataAction, setOneItemToProducts, setOneItemToWaitingList, iCartState, deleteItemAction } from "../cart-reducer";

let initialState: iCartState = {
    data: {
        products: [
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
        waitingList: []
    },
    totalSum: 0,
    isFetching: true
}

test('add data to cart', () => {
    let action = setCartDataAction({products: [], waitingList: []});

    let newState = cartReducer(initialState, action);

    expect(newState.data.products.length).toBe(0);
});

test('add one item to cart', () => {
    let action = setOneItemToWaitingList({
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

    expect(newState.data.waitingList.length).toBe(1);
})

// test('delete one item from cart', () => {
//     let action = deleteItemAction(10);

//     let newState = cartReducer(initialState, action);

//     expect(newState.data.length).toBe(2);
// })