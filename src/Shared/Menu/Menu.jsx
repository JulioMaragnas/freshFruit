import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";
import profileIcon from '../../Assets/profileIcon.png';
import { Menu } from "antd";
import { InfoCircleFilled, AppstoreOutlined } from "@ant-design/icons";
import { StatePurchaseContext } from "../../PerformaceHooks/useStatePurchase";

function MenuOrders() {
  const navigate = useNavigate();
  const [purchaseStateId, setPurchaseStateId] =
    useContext(StatePurchaseContext);
  const handleSetStateId = (stateId) => {
    setPurchaseStateId(stateId);
    navigate("listOrders");
  };
  const handleInventory = () => navigate("inventory");
  const handleMasters = (route) =>{
    const sw = {
      products: ()=> navigate('products'),
      master:()=> navigate('master'),
      pendingApprovals: ()=> navigate('pendingApprovals'),
      ['registerUser/1']: ()=> navigate('registerUser/1')
    }
    sw[route] && sw[route]();
  }

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
          defaultSelectedKeys={["p1"]}
          mode="inline"
        >
          <Menu.SubMenu
            key="purchase"
            title="Administración de compras"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#EBEBEB",
            }}
            icon={<AppstoreOutlined />}
          >
            <Menu.Item key="p1" icon={<InfoCircleFilled />}>
              <span onClick={() => handleSetStateId(2)}> Pedidos pendientes </span>
            </Menu.Item>
            <Menu.Item key="p2" icon={<InfoCircleFilled />}>
              <span onClick={() => handleSetStateId(1)}>Pedidos en proceso</span>
            </Menu.Item>
            <Menu.Item key="p3" icon={<InfoCircleFilled />}>
              <span onClick={() => handleSetStateId(4)}>Pedidos despachados</span>
            </Menu.Item>
            <Menu.Item key="p4" icon={<InfoCircleFilled />}>
              <span onClick={() => handleSetStateId(5)}>Pedidos entregados</span>
            </Menu.Item>
            <Menu.Item key="p5" icon={<InfoCircleFilled />}>
              <span onClick={() => handleSetStateId(6)}>Pedidos rechazados y/o devueltos</span>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="inventory"
            title="Administración de inventario"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#EBEBEB",
            }}
            icon={<AppstoreOutlined />}
          >
            <Menu.Item key="i1" icon={<InfoCircleFilled />}>
              <span onClick={handleInventory}>Inventarios</span>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="users"
            title="Administración de usuarios"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#EBEBEB",
            }}
            icon={<AppstoreOutlined />}
          >
            <Menu.Item key="u1" icon={<InfoCircleFilled />}>
              <span onClick={()=> handleMasters('pendingApprovals')}> Aprobaciones pendientes </span>
            </Menu.Item>
            <Menu.Item key="u2" icon={<InfoCircleFilled />}>
              <span onClick={()=> handleMasters('registerUser/1')}> Crear usuarios </span>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="masters"
            title="Administración de maestros"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#EBEBEB",
            }}
            icon={<AppstoreOutlined />}
          >
            <Menu.Item key="m1" icon={<InfoCircleFilled />}>
              <span onClick={()=> handleMasters('products')}> Productos </span>
            </Menu.Item>
            <Menu.Item key="m2" icon={<InfoCircleFilled />}>
              <span onClick={()=> handleMasters('master')}> Maestros </span>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
    </section>
  );
}
export default MenuOrders;
