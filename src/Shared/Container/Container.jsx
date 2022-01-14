import React, { useState, useEffect } from "react";
import "./Container.css";
import { Router } from "react-router-dom";
import Banner from "../Banner/Banner";
import CardProduct from "../../Shopping/CardProduct/CardProduct";
import Goals from "../../Shopping/Goals/Goals";
import { returnProducts } from "../../mocks";

function Container(props) {
  const [listProducts, setListProducts] = useState([]);
  
  useEffect( async ()=>{
    const products = await returnProducts(null)
    setListProducts(products)
  },[])

  return (
    <div className="container">
      <section className="container_banner">
        <Banner></Banner>
      </section>
      <section className="container_products">
        {
          listProducts.map(product => (<CardProduct product={product} />))
        }
      </section>
      <section className="container_goals">
        <Goals></Goals>
      </section>
    </div>
  );
}

export default Container;
