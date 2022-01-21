import React, {useContext, useEffect, useState} from "react";
import "./Menu.css";
import profileIcon from "../../Assets/profileIcon.png";
import { Menu } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import { StatePurchaseContext } from '../../PerformaceHooks/useStatePurchase';

function MenuOrders() {

  const [purchaseStateId, setPurchaseStateId] = useContext(StatePurchaseContext);
  const handleSetStateId = (stateId)=> setPurchaseStateId(stateId);
  
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
            <span onClick={()=> handleSetStateId(1)}> Pedidos pendientes </span>
          </Menu.Item>
          <Menu.Item key="2" icon={< InfoCircleFilled />}>
            <span onClick={()=> handleSetStateId(2)}> Pedidos en proceso </span>
          </Menu.Item>
          <Menu.Item key="3" icon={< InfoCircleFilled />}>
            <span onClick={()=> handleSetStateId(3)}> Pedidos despachados </span>
          </Menu.Item>
          <Menu.Item key="4" icon={< InfoCircleFilled />}>
            <span onClick={()=> handleSetStateId(4)}> Pedidos entregados </span>
          </Menu.Item>
          <Menu.Item key="" icon={< InfoCircleFilled />}>
            <span onClick={()=> handleSetStateId(5)}> Pedidos rechazados y/o devueltos </span>
          </Menu.Item>
          
        </Menu>
      </div>
    </section>
  );
}
export default MenuOrders;
