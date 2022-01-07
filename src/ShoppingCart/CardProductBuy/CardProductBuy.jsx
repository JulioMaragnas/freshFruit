import React from "react";


function CardProductBuy(params) {
  return(
    <div>
      <img className="card-product_image--full" src={null} alt="" />
      <h3> COD #### </h3>
      <p> <span className="card-product_label"> Cantidad: </span> {null} </p>
      <p> <span className="card-product_label"> Precio unitario: </span> {null} </p>
      <div>
        <button className="card-product_button--circle"> plus </button>
        <button className="card-product_button--circle"> less </button>
      </div>
      <div>
        <button className="card-product_button--delete"> delete </button>
      </div>
    </div>
  )
}

export default CardProductBuy;