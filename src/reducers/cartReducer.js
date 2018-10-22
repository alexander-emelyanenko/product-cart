import C from '../constants';

export const cartLine = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_CARTLINE:
            return {
                productId: action.id,
                quantity: 1
            };
        case C.CHANGE_CARTLINE_QUANTITY:   
            if (state.productId !== action.id) {
                return state;
            } else {
                return {
                    ...state,
                    quantity: action.quantity
                };
            }

        default:
            return state;
    }
}

export const cart = (state = [], action) => {
    switch (action.type) {
        case C.ADD_CARTLINE:
            const cl = state.find(cl => cl.productId === action.id);
            if (!cl) {
                return [
                    ...state,
                    cartLine({}, action)
                ];
            } else {
                return state;
            }

        case C.CHANGE_CARTLINE_QUANTITY:
            return state.map(cl => cartLine(cl, action));

        case C.REMOVE_CARTLINE:
            return state.filter(cl => cl.productId !== action.id);

        default:
            return state;
    }
}