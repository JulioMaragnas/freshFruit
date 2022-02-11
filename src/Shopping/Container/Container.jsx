import React, { useState, useEffect } from "react";
import "./Container.css";

import { getListInventory } from "../../requestInventory";
import Banner from "../../Shared/Banner/Banner";
import CardProduct from "../CardProduct/CardProduct";
import Goals from "../Goals/Goals";

function Container(props) {
  const [listProducts, setListProducts] = useState([]);
  
  useEffect(()=>{
    async function init(){
      const products = await getListInventory()  || [];
      setListProducts(products)
    }
    init();
  },[])

  return (
    <div className="w-100 display-flex-row container">
      <section className="w-100">
        <Banner></Banner>
      </section>
      <section className="container_products ant-row">
      
        {
          listProducts
            .filter(product => product.existencias >  0)
            .map(product => (<CardProduct product={product} key={product.id} />))
        }
      </section>
      <section className="container_goals">
        <Goals></Goals>
      </section>
    </div>
  );
}

export default Container;
