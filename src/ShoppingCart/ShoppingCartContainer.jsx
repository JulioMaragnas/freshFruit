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
    <section className="w-100 display-flex-row shopping-container ant-row">
      <div className="display-flex-row shopping-container_product-container ant-col ant-col-xs-24 ant-col-lg-18 ant-col-xl-18">
        <div className="ant-row">
          { cart.products.map(p => (<CardProductBuy  product={p} key={p.id} />)) }
        </div>
      </div>
      <div className="shopping-container_billing ant-col ant-col-xs-24 ant-col-lg-6 ant-col-xl-6">
        <CardBilling />
        {userlogged && <ProgressBar />}
      </div>
    </section>
  );
}
export default ShoppingCartContainer;
