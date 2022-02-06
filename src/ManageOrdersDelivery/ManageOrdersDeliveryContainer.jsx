import React from "react";
import { Outlet } from "react-router-dom";

function ManageOrdersDeliveryContainer() {

  return (
      <section className="w-100">
        <div>
          <Outlet />
        </div>
      </section>
  );
}

export default ManageOrdersDeliveryContainer;
