import C from '../constants';

export const addProduct = (id, name, category, price, quantity, priceChange) => ({
    type: C.ADD_PRODUCT,
    id, name, category, price, quantity, priceChange
});

export const updateProduct = (id, price, quantity, priceChange) => ({
    type: C.UPDATE_PRODUCT,
    id, price, quantity, priceChange
})