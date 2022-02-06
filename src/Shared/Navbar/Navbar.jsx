import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../PerformaceHooks/useCart";
import { Menu, Dropdown, message, Space } from "antd";
import "./Navbar.css";
import logo from "../../Assets/logoFFS.png";
import user from "../../Assets/userFFS.svg";
import carIcon from "../../Assets/shopping-cart.svg";

function Navbar(props) {
  const navigate = useNavigate();
  const [cart, setCart] = useContext(CartContext);
  
  const handleRoute = () => {
    cart && cart.products.length && navigate("shoppingCart");
    !(cart && cart.products.length) && message.info("El carrito est\xE1 vac\xEDo", 0.6);
  };
  
  const logoff = ()=>{
    sessionStorage.setItem('userlogged', false);
    navigate('/login')
  }
  
  const handleGetProfile = ()=>{
    const islogged = JSON.parse(sessionStorage.getItem('userlogged')) || false;
    !islogged && navigate('/login');
    islogged && navigate('/infoClient/0')
  } 

  return (
    <nav className="navbar">
      <Link to="/">
        <div className="navbar_container navbar_container--left">
          <img className="navbar_img--logo" src={logo} alt="logoFFS" />
        </div>
      </Link>
      <div className="navbar_container navbar_container--center">
        
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
            <Dropdown overlay={
              <Menu>
              <Menu.Item key="1">
                <a onClick={handleGetProfile}> Perfil </a>
              </Menu.Item>
              { cart.logged && <Menu.Item key="2">
                <a> Mis compras </a> 
              </Menu.Item>}
              { cart.logged &&  <Menu.Item key="3">
                <a onClick={logoff}> Cerrar Sesi&oacute;n </a>
              </Menu.Item>}
            </Menu>
            } placement="bottomLeft">
              <img className="navbar_img--header" src={user} alt="" />
            </Dropdown>
          </Space>
        </Space>
      </div>
    </nav>
  );
}

export default Navbar;
