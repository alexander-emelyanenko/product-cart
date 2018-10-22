import React from 'react';
import { connect } from 'react-redux';
import { addCartLine } from '../actions/cartActions';
import './style/product.css';

const Product = (props) => {
    const product = props.product;
    // Устанавливаем класс с подсветкой ячейки в зависимости от изменения цены
    const setColorClass = (priceChange) => {
        if (priceChange === 1) {
            return 'product__price--green';
        } else if (priceChange === -1) {
            return 'product__price--red';
        } else {
            return '';
        }
    }
    const colorClass = setColorClass(product.priceChange);

    return (
        <div className="product" onClick={() => props.onAddCartLine(product.id)}>
            <div className="product__description">
                <span>{product.name} ({product.quantity})</span>
            </div>
            <div className={"product__price " + colorClass}>
                <span>{product.price}</span>
            </div>
            
        </div>
    )
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onAddCartLine(id) {
        dispatch(addCartLine(id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);