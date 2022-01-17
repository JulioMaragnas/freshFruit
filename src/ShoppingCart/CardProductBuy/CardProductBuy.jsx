import React from "react";
import './CardProductBuy.css';
import imageReference from '../../Assets/imageReference.png'
import deleteIcon from '../../Assets/deleteIcon.png'

function CardProductBuy(params) {
  return(
    <div className="card-product-buy">
      <img className="w-100 card-product-buy_image--full" src={imageReference} alt="" />
      <h3> COD #### </h3>
      <p> <span className="card-product-buy_label"> Cantidad: </span> {null} </p>
      <p> <span className="card-product-buy_label"> Precio unitario: </span> {null} </p>
      <div className="display-flex-row card-product-buy_button-container">
        <div className="card-product-buy_button--add">
          <button className="container_button card-product-buy_button--circle">➕</button>
          <span>##</span>
          <button className="container_button card-product-buy_button--circle" style={{marginLeft:'5px'}}> ➖ </button>
        </div>
        <button className="container_button">
          <img src={deleteIcon} alt="delete" />
          <span> Eliminar </span>
        </button>
      </div>
    </div>
  )
}

export default CardProductBuy;