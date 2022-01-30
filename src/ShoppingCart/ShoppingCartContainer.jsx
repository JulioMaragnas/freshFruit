import React, {  useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./ShoppingCartContainer.css";
import CardProductBuy from "./CardProductBuy/CardProductBuy";
import CardBilling from "./CardBilliing/CardBilling";
import ProgressBar from './ProgressBar/ProgressBar';
import {CartContext} from '../PerformaceHooks/useCart';

function ShoppingCartContainer(params) {
  const userlogged = JSON.parse(sessionStorage.getItem('userlogged'));
  const [ cart, setCart ] = useContext(CartContext);
  const navigate = useNavigate()
  
  useEffect(()=>{
    if (!cart.products.length) {
      navigate('/')
    }
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
        {userlogged && <ProgressBar />}
      </div>
    </section>
  );
}
export default ShoppingCartContainer;