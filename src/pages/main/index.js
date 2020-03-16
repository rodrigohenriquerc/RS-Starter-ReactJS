import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';

class Main extends Component {
  state = {
    products: [],
    productInfo: {},
    page: 1
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    try {
      const response = await api.get(`/products?page=${page}`);
      const { docs: products, ...productInfo } = response.data;
      this.setState({ products, productInfo, page });
    } catch (err) {
      console.log(err);
    }
  }

  prevPage = () => {
    const { page } = this.state;

    if (page === 1) return;

    const pageNumber = page - 1;

    this.loadProducts(pageNumber);
  }

  nextPage = () => {
    const { page, productInfo } = this.state;

    if (page === productInfo.pages) return;

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  }

  render() {
    const { products, productInfo, page } = this.state;

    return (
      <div className='product-list'>
        {products.map(product => (
          <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>
            <a target='_blank' rel='noopener noreferrer' href={product.url}>Acessar</a>
          </article>
        ))}
        <div className='actions'>
          <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
          <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
        </div>
      </div>
    );
  }
}

export default Main;