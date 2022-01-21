import React, { useEffect } from 'react';
import { Route, Routes, Outlet } from "react-router-dom";
import { getStates } from './requestMasters';
import { getUserInfo } from './requestUser';
import './App.css';
import "antd/dist/antd.css";
import Navbar from './Shared/Navbar/Navbar';
import Container from './Shopping/Container/Container';
import ShoppingCartContainer from './ShoppingCart/ShoppingCartContainer';
import ManageOrdersContainer from './ManageOrders/ManageOrdersContainer';
import OrderCardList from './ManageOrders/OrderCardList/OrderCardList';
import DetailOrder from './ManageOrders/DetailOrder/DetailOrder';
import InventoryContainer from './Inventory/InventoryContainer';

function App() {

  useEffect(()=>{
    async function getData(){
      const states = await getStates();
      sessionStorage.setItem('purchaseState', JSON.stringify(states))
      
      const user = await getUserInfo();
      sessionStorage.setItem('userInfo', JSON.stringify(user))
    }
    getData();
  },[])
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" index element={<Container />}></Route>
        <Route path="shoppingCart" element={<ShoppingCartContainer />}></Route>
        <Route path="manageOrders" element={ <ManageOrdersContainer /> }>
          <Route path="list" index element={<OrderCardList />}></Route>
          <Route path="detail/:detailId" element={<DetailOrder />}></Route>
        </Route>
        <Route path="inventory" element={<InventoryContainer />}>
          {/* <Route path="list" element={<InventoryContainer />}></Route> */}
        </Route>
      </Routes>
      <Outlet />
    </>
  );
}
export default App;
