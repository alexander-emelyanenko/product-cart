import C from '../constants'

export const addCartLine = (id) => ({
    type: C.ADD_CARTLINE,
    id
})

export const changeCartLineQuantity = (id, quantity) => ({
    type: C.CHANGE_CARTLINE_QUANTITY,
    id,
    quantity
});

export const removeCartLine = (id) => ({
    type: C.REMOVE_CARTLINE,
    id: id
});

