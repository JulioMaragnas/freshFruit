import React, { useEffect } from 'react';
import { Route, Routes, Outlet } from "react-router-dom";
import { getStates } from './requestMasters';
import './App.css';
import "antd/dist/antd.css";
import Navbar from './Shared/Navbar/Navbar';
import Container from './Shopping/Container/Container';
import ShoppingCartContainer from './ShoppingCart/ShoppingCartContainer';
import ManageOrdersContainer from './ManageOrders/ManageOrdersContainer';
import OrderCardList from './ManageOrders/OrderCardList/OrderCardList';
import DetailOrder from './ManageOrders/DetailOrder/DetailOrder';
import InventoryList from './Inventory/InventoryList/InventoryList';
import Movements from './Inventory/Movements/Movements';
import ProductDetail from './Product/ProductDetail/ProductDetail';

function App() {

  useEffect( ()=>{
    async function init(){
      const states = await getStates();
      sessionStorage.setItem('purchaseState', JSON.stringify(states));
    }
    init()
  },[])
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" index element={<Container />}></Route>
        <Route path="shoppingCart" element={<ShoppingCartContainer />}></Route>
        <Route path="manageOrders" element={ <ManageOrdersContainer /> }>
          <Route path="listOrders" index element={<OrderCardList />}></Route>
          <Route path="detail/:detailId" element={<DetailOrder />}></Route>
          <Route path="inventory" element={<InventoryList />}></Route>
          <Route path="inventoryDetail/:inventoryId" element={<Movements />}></Route>
          <Route path="product/:productId" element={<ProductDetail />}></Route>
        </Route>
      </Routes>
      <Outlet />
    </>
  );
}
export default App;
