import React, {  useContext, useEffect } from "react";
import "./ShoppingCartContainer.css";
import CardProductBuy from "./CardProductBuy/CardProductBuy";
import CardBilling from "./CardBilliing/CardBilling";
import ProgressBar from './ProgressBar/ProgressBar';
import {CartContext} from '../PerformaceHooks/useCart';

function ShoppingCartContainer(params) {

  const [ cart, setCart ] = useContext(CartContext);
  
  useEffect(()=>{
    const total = cart.products.length ? cart.products.reduce((accum, curr) => accum + (curr.cantidadAgregada * curr.productos.precio),0): 0;
    setCart({...cart, total})
  },[])
  return (
    
    <section className="w-100 display-flex-row shopping-container">
      <div className="display-flex-row shopping-container_product-container">
        { cart.products.map(p => (<CardProductBuy  product={p} key={p.id} />)) }
      </div>
      <div className="shopping-container_billing">
        <CardBilling />
        <ProgressBar />
      </div>
    </section>
  );
}

export default ShoppingCartContainer;
