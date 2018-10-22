import React from 'react';
import { connect } from 'react-redux';
import { changeCartLineQuantity, removeCartLine } from '../actions/cartActions';

import './style/cartline.css';
import './style/buttons.css';
import './style/icons.css';

const CartLine = (props) => {
    const products = props.products;
    const cartLine = props.cartLine;
    // Находим соответствующий линии товар в хранилище для соотнесения данных для отображения
    const productInStore = products.filter((product) => product.id === cartLine.productId)[0];
    
    // Устанавливаем диапазон возможных значений количества товара в линии
    // Должна быть, как минимум, 1 единица, максимум - доступное количество товара
    // Обновляем количество товара в линии
    const handleChange = (value) => {
        let quantity;
        value = value.replace(/^0+/, '');
        if (value < 1) {
            quantity = 0;
        } else if (value > productInStore.quantity) {
            quantity = productInStore.quantity
        } else {
            quantity = value;
        }
        props.onChangeCartLineQuantity(cartLine.productId, quantity);
    };

    // Изменяем недопустимое значение ввода на 1
    const handleBlur = (input) => {
        if (input.value < 1) {
            input.value = 1;
            props.onChangeCartLineQuantity(cartLine.productId, 1);
        };
    }

    return (
        <tr key={cartLine.productId} className="cartline">

            <td className="cartline__cell cartline__title">
                {productInStore.name}
            </td>

            <td className="cartline__cell cartline__quantity">
                <input type="number"
                    value={cartLine.quantity}
                    className="cartline__quantity-input"
                    onBlur={(e) => handleBlur(e.target)}
                    onChange={(e) => handleChange(e.target.value)}
                    />
                <span className="cartline__quantity-units"> шт.</span>
            </td>

            <td className="cartline__cell cartline__price">
                <span className="cartline__price-value">{productInStore.price}</span>
                <span className="cartline__price-units"> руб. \ шт.</span>
            </td>

            <td className="cartline__cell cartline__button">
                <button className="button button--delete"
                    onClick={() => props.onRemoveCartLine(cartLine.productId)}>
                    <span className="button__icon icon icon-delete"></span>
                    <span className="button__text">Удалить</span>
                </button>
            </td>

        </tr>
    );
}

const mapStateToProps = state => ({
    products: [...state.products]
})

const mapDispatchToProps = dispatch => ({

    onChangeCartLineQuantity(id, quantity) {
        dispatch(changeCartLineQuantity(id, quantity))
    },
    onRemoveCartLine(id) {
        dispatch(removeCartLine(id));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CartLine);