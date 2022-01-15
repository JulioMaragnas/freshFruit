import React from "react";
import logo from "../../Assets/logoFFS.png";
import user from "../../Assets/userFFS.png";
import carIcon from "../../Assets/carIcon.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <nav className="navbar">
      <Link to="/">
          <div className="navbar_container navbar_container--left">
            <img className="navbar_img--logo" src={logo} alt="logoFFS" />
          </div>
      </Link>
      <div className="navbar_container navbar_container--center">
        <h1 className="navbar_title"> Tienda FreshFruit </h1>
      </div>
      <Link to="shoppingCart">
        <div className="navbar_container navbar_container--right">
          <img className="navbar_img--header" src={carIcon} alt="" />
          <img className="navbar_img--header" src={user} alt="" />
        </div>
      </Link>
    </nav>
  );
}

export default Navbar;
