import React from "react";
import { Outlet } from "react-router-dom";
import "./ManageOrdersContainer.css";
import Menu from "./Menu/Menu";

function ManageOrdersContainer(params) {
  return (
    <section className="w-100 display-flex-row manage-orders">
      <div className="manage-orders_menu">
        <Menu />
      </div>
      <div className="manage-orders_view">
        <Outlet />
      </div>
    </section>
  );
}

export default ManageOrdersContainer;
