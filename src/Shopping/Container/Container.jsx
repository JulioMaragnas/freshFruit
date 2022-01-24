import React, { useState, useEffect } from "react";
import "./Container.css";

import { getListInventory } from "../../requestInventory";
import { getUserInfo } from '../../requestUser';


import Banner from "../../Shared/Banner/Banner";
import CardProduct from "../CardProduct/CardProduct";
import Goals from "../Goals/Goals";

function Container(props) {
  const [listProducts, setListProducts] = useState([]);
  
  useEffect(()=>{
    async function init(){
      const products = await getListInventory()  || [];
      setListProducts(products)
      
      const user = await getUserInfo();
      sessionStorage.setItem('userInfo', JSON.stringify(user))
    }
    init();
  },[])

  return (
    <div className="w-100 display-flex-row container">
      <section className="w-100">
        <Banner></Banner>
      </section>
      <section className="display-flex-row container_products">
      
        {
          listProducts.map(product => (<CardProduct product={product} key={product.id} />))
        }
      </section>
      <section className="container_goals">
        <Goals></Goals>
      </section>
    </div>
  );
}

export default Container;
