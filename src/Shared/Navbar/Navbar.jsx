import React, { useContext , useEffect} from "react";
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
  
  useEffect(() => {
    const userLogged = JSON.parse(sessionStorage.getItem("userlogged"));

    if(userLogged){
       const { roles: {codigo}} = JSON.parse(sessionStorage.getItem("userInfo"));
       setCart({...cart, role: codigo,logged: true })
    }else{
      setCart({...cart, logged: false})
    }
   

  }, []);


  const handleRoute = () => {
    cart && cart.products.length && navigate("shoppingCart");
    !(cart && cart.products.length) && message.info("El carrito est\xE1 vac\xEDo", 0.6);
  };
  
  const logoff = ()=>{
    sessionStorage.setItem('userlogged', false);
    sessionStorage.removeItem('userInfo');
    setCart({...cart, logged: false });
    navigate('/login')
  }
  
  const handleGetProfile = ()=>{
    !cart.logged && navigate('/login');
    cart.logged && navigate('/infoClient/0')
  } 

  const handleMainPage = ()=>{
    cart.role == "ADMIN" && navigate('/manageOrders/charts');
    cart.role == "CLIENTE" && navigate('/manageOrdersUser/listOrders');
    cart.role == "REPARTIDOR" && navigate('/manageOrdersDelivery/listOrders');
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
                <a onClick={handleGetProfile}> {cart.logged ? "Perfil" : "Iniciar sesión"} </a>
              </Menu.Item>
              { cart.logged &&<><Menu.Item key="2">
                <a onClick={handleMainPage}> {cart.role ==  "ADMIN" ? "Dashboard" : cart.role ==  "CLIENTE" ? "Mis compras" : "Mis órdenes" } </a> 
              </Menu.Item>
              <Menu.Item key="3">
                <a onClick={logoff}> Cerrar Sesi&oacute;n </a>
              </Menu.Item></>}
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
