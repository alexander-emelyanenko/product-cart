import React from 'react';
import { connect } from 'react-redux';
import Category from './Category';
import './style/categories.css';

const Categories = (props) => {
    // Извлекаем продукты из хранилища
    const products = props.products;
    
    // Сортируем продукты по категориям
    const productsByCategory = {};
    products.forEach(product => {
        const category = product.category.name;
        if (!productsByCategory[category]) {
            productsByCategory[category] = [];
        }
        productsByCategory[category].push(product);
    });
    
    // Делим продукты по категориям на четные и нечетные для разбиения по колонкам
    const odd = Object.keys(productsByCategory)
                .filter((category, index) => index % 2 === 0 );
    const even = Object.keys(productsByCategory)
                .filter((category, index) => index % 2 !== 0 );
    
    return (
        <div className="categories">
            <div className="categories__column categories__column--left"> 
            {
                odd.map((category) =>
                    <Category
                        key={category}
                        name={category}
                        products={productsByCategory[category]} />
                )
            }
            </div>
            <div className="categories__column categories__column--right"> 
            {
                even.map((category) =>
                <Category
                    key={category}
                    name={category}
                    products={productsByCategory[category]} />
                )
            }
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    products: [...state.products]
});

export default connect(mapStateToProps)(Categories);