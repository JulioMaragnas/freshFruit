import React from "react";
import "./Container.css";
import { Router } from "react-router-dom";
import Banner from "../Banner/Banner";
import CardProduct from "../../Shopping/CardProduct/CardProduct";
import Goals from "../../Shopping/Goals/Goals";

function Container(props) {
  return (
    <div className="container">
      <section className="container_banner">
        <Banner></Banner>
      </section>
      <section className="container_products">
        <CardProduct></CardProduct>
        <CardProduct></CardProduct>
        <CardProduct></CardProduct>
        <CardProduct></CardProduct>
        <CardProduct></CardProduct>
        <CardProduct></CardProduct>
        <CardProduct></CardProduct>
        <CardProduct></CardProduct>
      </section>
      <section className="container_goals">
        <Goals></Goals>
      </section>
    </div>
  );
}

export default Container;
