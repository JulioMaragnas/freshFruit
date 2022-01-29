import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./ManageOrdersContainer.css";
import MenuOrders from "../Shared/Menu/Menu";
import { StatePurchaseProvider } from '../PerformaceHooks/useStatePurchase';

function ManageOrdersContainer() {
  const navigate = useNavigate();
  useEffect(() => {
    const userlogged = JSON.parse(sessionStorage.getItem('userlogged'));
    !userlogged && navigate('../login')
  }, []);
  
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
