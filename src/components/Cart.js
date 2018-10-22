import React from 'react';
import { connect } from 'react-redux';
import CartLine from './CartLine';

import './style/cart.css';
import './style/icons.css';

const Cart = (props) => {
    
    const products = props.products;
    const cart = props.cart;

    // Cоотносим id продукта с его ценой
    const productsPrices = {};
    products.forEach(product => {
        productsPrices[product.id] = product.price;
    });

    // По каждой линии высчитываем стоимость и складываем все линии
    const total = cart.map(cartline => productsPrices[cartline.productId] * cartline.quantity)
                      .reduce((a, b) => a + b, 0).toFixed(2);

    //
    return (
        <div className="cart-container">
            <table className="cart">
                <thead className="cart__head">
                    <tr>
                        <th className="cart__title">Наименование</th>
                        <th className="cart__title">Количество</th>
                        <th colSpan="2" className="cart__title">Цена</th>
                    </tr>
                </thead>
                <tbody className="cart__body">
                    {   
                        (cart.length > 0) ?
                        cart.map((cartLine) =>
                            <CartLine key={cartLine.productId} cartLine={cartLine}/>
                        )
                        :
                        (
                            <tr className="cart__body cart__body--empty">
                                <td colSpan="4" className="cart__empty-line">
                                    <span className="icon icon-shopping-cart"></span>
                                     Корзина пуста
                                </td>
                            </tr>
                        )
                    }
                </tbody>
                <tfoot className="cart__footer">
                    <tr>
                        <td colSpan="2"  className="cart__footer-cell cart__total-text">
                            Общая стоимость: 
                        </td>
                        <td colSpan="2" className="cart__footer-cell cart__total-price" >
                            <span className="cart__total-value">{ total }</span>
                            <span className="cart__total-units"> руб.</span>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
        
    )
}

const mapStateToProps = state => ({
    products: [...state.products],
    cart: [...state.cart]
})

export default connect(mapStateToProps)(Cart);