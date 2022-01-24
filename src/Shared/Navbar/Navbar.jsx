import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../PerformaceHooks/useCart";
import { Menu, Dropdown, Button, Space } from "antd";
import "./Navbar.css";
import logo from "../../Assets/logoFFS.png";
import user from "../../Assets/userFFS.png";
import carIcon from "../../Assets/carIcon.png";


const menu = (
  <Menu>
    <Menu.Item key="1">
      <a> Perfil </a>
    </Menu.Item>
    <Menu.Item key="2">
      <a> Mis compras </a> 
    </Menu.Item>
    <Menu.Item key="3">
      <a> Cerrar Sesi&oacute;n </a>
    </Menu.Item>
  </Menu>
);

function Navbar(props) {
  const [cart, setCart] = useContext(CartContext);
  const navigate = useNavigate();
  const handleRoute = () => {
    cart && cart.products.length && navigate("shoppingCart");
    !(cart && cart.products.length) && window.alert("El carrito est\xE1 vac\xEDo");
  };

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
      <div className="navbar_container navbar_container--right">
        <img
          onClick={handleRoute}
          className="navbar_img--header"
          src={carIcon}
          alt=""
        />
        <Space direction="vertical">
          <Space wrap>
            <Dropdown overlay={menu} placement="bottomLeft">
              <img className="navbar_img--header" src={user} alt="" />
            </Dropdown>
          </Space>
        </Space>
      </div>
    </nav>
  );
}

export default Navbar;
