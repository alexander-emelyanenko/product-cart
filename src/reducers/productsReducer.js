import C from '../constants';

export const product = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_PRODUCT:
            return {
                id: action.id,
                name: action.name,
                category: action.category,
                price: action.price,
                quantity: action.quantity,
                priceChange: action.priceChange
            };
        case C.UPDATE_PRODUCT:
            if (state.id !== action.id) {
                return state;
            } else {
                return {
                    ...state,
                    price: action.price,
                    quantity: action.quantity,
                    priceChange: action.priceChange
                };
            }
        default:
            return state;
    }
}

export const products = (state = [], action) => {
    switch (action.type) {
        case C.ADD_PRODUCT:
            return [
                ...state,
                product({}, action)
            ];
        case C.UPDATE_PRODUCT:
            return state.map(p => product(p, action));      
        case C.REMOVE_PRODUCT:
            return state.filter(product => product.id !== action.id);    
        default:
            return state;
    }
}