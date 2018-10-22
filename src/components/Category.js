import React, { Component } from 'react';
import Product from './Product';

import './style/category.css';
import './style/icons.css';

class Category extends Component {
    state = {
        isHidden: false
    }
    toggle() {
        this.setState({isHidden: !this.state.isHidden});
    }
    render() {
        const name = this.props.name;
        const products = this.props.products;
        return (
            <div className="category">
                <div className="category__head" onClick={this.toggle.bind(this)}>
                    <span className={`icon icon-toggle ${this.state.isHidden ? "icon-toggle--closed": ""}`}></span>
                    <h3 className="category__name">{name}</h3>
                </div>
                <div className={`category__body ${this.state.isHidden ? "category__body--hidden": ""}`}>
                {
                    products.map((product) =>
                        <Product key={product.id} product={product}/>
                    )
                }
                </div>
            </div>
        );
    }
}

export default Category;