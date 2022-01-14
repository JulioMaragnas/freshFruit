import React from 'react'
import './ShoppingCartContainer.css';
import CardProductBuy from './CardProductBuy/CardProductBuy';
import CardBilling from './CardBilliing/CardBilling'

function ShoppingCartContainer (params) {
    return(
      <section className="shopping-container">
        <div className="shopping-container_product-container">
          <CardProductBuy />
          <CardProductBuy />
          <CardProductBuy />
        </div>
        <div className="shopping-container_billing">
          <CardBilling />
        </div>
      </section>
    )
}

export default ShoppingCartContainer