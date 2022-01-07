import React from 'react'
import './ShoppingCartContainer.css';
import CardProductBuy from './CardProductBuy/CardProductBuy';

function ShoppingCartContainer (params) {
    return(
      <section className="shopping-container">
        <div className="shopping-container_product-container">
          <CardProductBuy />
        </div>
        <div className="shopping-container_billing"></div>
      </section>
    )
}

export default ShoppingCartContainer