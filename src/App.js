import React, { useEffect } from 'react';
import { Route, Routes, Outlet } from "react-router-dom";
import { getStates, getReasons } from './requestMasters';
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
import ProductList from './Product/ProductList/ProductList';
import ProductDetail from './Product/ProductDetail/ProductDetail';

function App() {

  useEffect( ()=>{
    async function init(){
      const states = await getStates();
      sessionStorage.setItem('purchaseState', JSON.stringify(states));
      
      const reasons = await getReasons();
      sessionStorage.setItem('reasons', JSON.stringify(reasons));
      
      sessionStorage.setItem('token', 'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJmcmVzaEZydWl0IiwiYXV0aG9yaXRpZXMiOlsiUk9MX0FETUlOIl0sImlhdCI6MTY0MzA3OTU2MCwiZXhwIjoxNjQ0Mjc5NTYwfQ.kxXFtn_1Hz9XXzLtEO-LGOw_K_qopKnPDBlQ7YOyRieoLilC8AAnKi5zlfoAmwNUhB6TNrnKKcWKDf5ErKOuEQ')
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
          <Route path="products" element={<ProductList />}></Route>
          <Route path="productDetail/:productId" element={<ProductDetail />}></Route>
        </Route>
      </Routes>
      <Outlet />
    </>
  );
}
export default App;
