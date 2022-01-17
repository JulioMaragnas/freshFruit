import React from "react";
import "./Menu.css";
import profileIcon from '../../Assets/profileIcon.png';

function Menu() {
  return (
    <section className="w-100 menu">
      <div className="display-flex-row menu_header">
        <div className="menu_user-logged">
          <h5>Nombre de usuario</h5>
          <h2> Jenny Castano </h2>
        </div>
        <img className="menu_icon-profile" src={profileIcon} alt="" />
      </div>
      <div className="menu_steps">
        <ul>
          <li className="menu_step-item menu_step-item--active"> <h3> Pedidos pendientes </h3> </li>
          <li className="menu_step-item"> <h3>Pedidos con orden generada</h3> </li>
          <li className="menu_step-item"> <h3>Pedidos en proceso</h3> </li>
          <li className="menu_step-item"> <h3>Pedidos entregados</h3> </li>
          <li className="menu_step-item"> <h3>Pedidos rechazados y/o devueltos</h3> </li>
        </ul>
      </div>
    </section>
  );
}
export default Menu;
