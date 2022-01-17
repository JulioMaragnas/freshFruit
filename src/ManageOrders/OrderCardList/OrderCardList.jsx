import React from "react";
import "../ManageOrdersContainer.css";
import OrderCard from '../OrderCard/OrderCard';

function OrderCardList() {
  return (
    <div className="w-100">
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
    </div>
  );
}

export default OrderCardList;
