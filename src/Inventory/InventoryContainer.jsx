import React from "react";
import { Outlet } from "react-router-dom";
import "./InventoryContainer.css";
import MenuInventory from './MenuInventory/MenuInventory';

function InventoryContainer(params) {
  return (
    <section className="w-100 display-flex-row inventory-container">
      <div className="manage-orders_menu">
        <MenuInventory />
      </div>
      <div className="manage-orders_view">
        <Outlet />
      </div>
    </section>
  );
}
export default InventoryContainer;
