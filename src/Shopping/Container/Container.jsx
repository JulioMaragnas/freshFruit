import React, { useState, useEffect } from "react";
import "./Container.css";
import Banner from "../../Shared/Banner/Banner";
import CardProduct from "../CardProduct/CardProduct";
import Goals from "../Goals/Goals";
import { returnProducts } from "../../mocks";

function Container(props) {
  const [listProducts, setListProducts] = useState([]);
  
  useEffect( async ()=>{
    const products = await returnProducts(null)
    setListProducts(products)
  },[])

  return (
    <div className="w-100 display-flex-row container">
      <section className="w-100">
        <Banner></Banner>
      </section>
      <section className="display-flex-row container_products">
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
