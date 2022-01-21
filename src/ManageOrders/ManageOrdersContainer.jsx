import React, {useState, useEffect, useContext} from "react";
import { Outlet } from "react-router-dom";
import "./ManageOrdersContainer.css";
import MenuOrders from "./Menu/Menu";
import { StatePurchaseProvider } from '../PerformaceHooks/useStatePurchase';

function ManageOrdersContainer(params) {
  return (
    <StatePurchaseProvider>
      <section className="w-100 display-flex-row manage-orders">
        <div className="manage-orders_menu">
          <MenuOrders />
        </div>
        <div className="manage-orders_view">
          <Outlet />
        </div>
      </section>
    </StatePurchaseProvider>
  );
}

export default ManageOrdersContainer;
