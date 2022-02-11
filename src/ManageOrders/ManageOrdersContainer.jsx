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
    userlogged && navigate('charts')
  }, []);
  
  return (
    <StatePurchaseProvider>
      <section className="w-100 display-flex-row manage-orders ant-row">
        <div className="ant-col ant-col-xs-24 ant-col-lg-5 ant-col-xl-5">
          <MenuOrders />
        </div>
        <div className="ant-col ant-col-xs-24 ant-col-lg-19 ant-col-xl-19">
          <Outlet />
        </div>
      </section>
    </StatePurchaseProvider>
  );
}

export default ManageOrdersContainer;
