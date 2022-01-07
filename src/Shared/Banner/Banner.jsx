import banner004 from '../../Assets/banner004.png';
import React from "react";

import '../Banner/Banner.css'

function Banner() {
  return (
    <section className="banner">
      <img src={banner004} alt="banner" className="banner_img--full" />
    </section>
  );
}

export default Banner
