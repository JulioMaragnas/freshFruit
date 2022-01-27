import React, { useState, useContext, useEffect } from "react";
import "./CardProductBuy.css";
import deleteIcon from "../../Assets/deleteIcon.png";
import { CartContext } from '../../PerformaceHooks/useCart';

function CardProductBuy({ product }) {
  const [aditionalQuantiy, setAditionalQuantiy] = useState(product.cantidadAgregada);
  const [ cart, setCart ] = useContext(CartContext);
  
  useEffect(()=>{
    const newTotal = cart.products.length ? cart.products.reduce((accum, curr) => accum + (curr.id === product.id ? (aditionalQuantiy * curr.productos.precio): (curr.cantidadAgregada * curr.productos.precio)),0): 0;
    setCart({...cart, total: newTotal})
  },[aditionalQuantiy])

  const {productos: { imagen }} = product;
  return (
    <div className="card-product-buy">
      <img
        className="w-100 image--br-5 card-product-buy_image--full"
        src={`${imagen}`}
        alt=""
      />
      <h3> COD {product.id} </h3>
      <p>
        <span className="card-product-buy_label"> Cantidad: </span>
        {product.cantidadAgregada}
      </p>
      <p>
        <span className="card-product-buy_label"> Precio unitario: </span>
        {product.productos.precio}
      </p>
      <div className="display-flex-row card-product-buy_button-container">
        <div className="card-product-buy_button--add">
          <button
            onClick={ ()=> aditionalQuantiy < product.existencias ? setAditionalQuantiy(aditionalQuantiy + 1) : null }
            className="container_button card-product-buy_button--circle"
          >
            ➕
          </button>
          <span>{aditionalQuantiy}</span>
          <button
            className="container_button card-product-buy_button--circle"
            onClick={()=> aditionalQuantiy !== 1 ? setAditionalQuantiy(aditionalQuantiy - 1) : null }
            style={{ marginLeft: "5px" }}
          >
            ➖
          </button>
        </div>
        <button className="container_button">
          <img src={deleteIcon} alt="delete" />
          <span> Eliminar </span>
        </button>
      </div>
    </div>
  );
}

export default CardProductBuy;
