import React from "react";
import '../Banner/Banner.css'

function Banner() {
  return (
    <section className="banner" style={{backgroundImage: 'url(/assets/banner004.png)'}}>
      <div className="bg"></div>
      <div className="title">
        Tienda Fresh Fruit
      </div>
    </section>
  );
}

export default Banner
