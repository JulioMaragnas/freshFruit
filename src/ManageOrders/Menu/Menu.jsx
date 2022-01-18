import React from "react";
import "./Menu.css";
import profileIcon from "../../Assets/profileIcon.png";
import { Menu } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";

function MenuOrders() {
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
        <Menu
          style={{ width: "100%", height: "100%", backgroundColor: "#EBEBEB" }}
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item key="1" icon={< InfoCircleFilled />}>
            Pedidos pendientes
          </Menu.Item>
          <Menu.Item key="2" icon={< InfoCircleFilled />}>
            Pedidos con orden generada
          </Menu.Item>
          <Menu.Item key="3" icon={< InfoCircleFilled />}>
            Pedidos en proceso
          </Menu.Item>
          <Menu.Item key="4" icon={< InfoCircleFilled />}>
            Pedidos entregados
          </Menu.Item>
          <Menu.Item key="" icon={< InfoCircleFilled />}>
            Pedidos rechazados y/o devueltos
          </Menu.Item>
          
        </Menu>
      </div>
    </section>
  );
}
export default MenuOrders;
