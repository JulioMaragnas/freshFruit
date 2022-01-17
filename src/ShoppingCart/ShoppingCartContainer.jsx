import React, { useState, useEffect } from "react";
import "./ShoppingCartContainer.css";
import CardProductBuy from "./CardProductBuy/CardProductBuy";
import CardBilling from "./CardBilliing/CardBilling";
import ProgressBar from './ProgressBar/ProgressBar';

function ShoppingCartContainer(params) {
  const [productsCar, setProductsCar] = useState([]);
  return (
    <section className="w-100 display-flex-row shopping-container">
      <div className="display-flex-row shopping-container_product-container">
        <CardProductBuy />
        <CardProductBuy />
        <CardProductBuy />
        <CardProductBuy />
        <CardProductBuy />
        <CardProductBuy />
      </div>
      <div className="shopping-container_billing">
        <CardBilling />
        <ProgressBar />
      </div>
    </section>
  );
}

export default ShoppingCartContainer;
