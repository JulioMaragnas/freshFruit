import React from "react";
import { Outlet } from "react-router-dom";

function ManageOrdersUserContainer() {

  return (
      <section className="w-100">
        <div>
          <Outlet />
        </div>
      </section>
  );
}

export default ManageOrdersUserContainer;
