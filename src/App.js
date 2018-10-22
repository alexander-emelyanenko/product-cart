import React, { Component } from 'react';
import { connect } from 'react-redux';
import Categories from './components/Categories';
import Cart from './components/Cart';
import { addProduct, updateProduct } from './actions/productsActions';
import { loadData } from './network';
import { createProducts } from './helpers';

class App extends Component {

  state = {
    loading: true,
    loadingError: false,
    // Период обновления
    seconds: 15
  }


  loadProducts() {
    return new Promise((resolve) => {
      loadData('./data.json')
        // Из загруженного файла создаем массив продуктов
        .then(payload => createProducts(this.props.products, payload))
        // Каждый продукт помещаем в хранилище
        .then(products => products.forEach(product => {
          let {id, name, category, price, quantity, priceChange} = product;
          this.props.onAddProduct(id, name, category, price, quantity, priceChange)
        }))
        .then(() => this.setState({loading: false}))
        .then(() => resolve())
        .catch(e => {
          this.setState({loadingError: true});
          return new Error(e)
        });
    })
  }

  updateProducts() {
      loadData('./data.json')
      .then(payload => createProducts(this.props.products, payload))
      .then(products => products.forEach(product => {
        let {id, price, quantity, priceChange} = product;
        this.props.onUpdateProduct(id, price, quantity, priceChange);
      }));
  }

  componentDidMount() {
    // После создания и помещения продуктов в харнилище, запускаем таймер обновления
    this.loadProducts()
      .then(() => {
        this.update = setInterval(() => {
          this.updateProducts()
        }, this.state.seconds * 1000);
      })
      
  }

  componentWillUnmount() {
    clearInterval(this.update);
  }

  render() {
    const loadingTemplate = (
      <div className="loading">
        { 
          this.state.loadingError ?
          <span className="loading-message loading-message--error">
            При загрузки данных произошла ошибка
          </span>
          :
          <span className="loading-message">
            Загрузка...
          </span>
        }
      </div>
    );

    const storeTemplate = (
      <div>
        <Categories/>
        <Cart/>
      </div>
    );

    return this.state.loading ? loadingTemplate : storeTemplate;
  }
}

const mapStateToProps = state => ({
  products: [...state.products]
})

const mapDispatchToProps = dispatch => ({

  onAddProduct(id, name, category, price, quantity, priceChange) {
    dispatch(addProduct(id, name, category, price, quantity, priceChange));
  },

  onUpdateProduct(id, price, quantity, priceChange) {
    dispatch(updateProduct(id, price, quantity, priceChange));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
