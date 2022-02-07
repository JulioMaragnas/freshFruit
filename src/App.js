import React, { useEffect } from 'react';
import { HashRouter, Route, Routes, Outlet } from "react-router-dom";
import { getStates, getReasons } from './requestMasters';
import './App.css';
import "antd/dist/antd.css";
import Navbar from './Shared/Navbar/Navbar';
import Login from './Users/Login/Login';
import UserRegister from './Users/UserRegister/UserRegister';
import Container from './Shopping/Container/Container';
import ShoppingCartContainer from './ShoppingCart/ShoppingCartContainer';
import ManageOrdersContainer from './ManageOrders/ManageOrdersContainer';
import OrderCardList from './ManageOrders/OrderCardList/OrderCardList';
import DetailOrder from './ManageOrders/DetailOrder/DetailOrder';
import InventoryList from './Inventory/InventoryList/InventoryList';
import Movements from './Inventory/Movements/Movements';
import ProductList from './Product/ProductList/ProductList';
import ProductDetail from './Product/ProductDetail/ProductDetail';
import PendingApprovals from './Users/PendingApprovals/PendingApprovals';
import ChartsContainer from './Charts/ChartsContainer';
import OrderUserList from './ManageOrdersUser/OrderUser/OrderUserList';
import ManageOrdersUserContainer from './ManageOrdersUser/ManageOrdersUserContainer';
import ManageOrdersDeliveryContainer from './ManageOrdersDelivery/ManageOrdersDeliveryContainer';
import OrderDeliveryList from './ManageOrdersDelivery/OrderDelivery/OrderDeliveryList';
import GoalsList from './Users/GoalsList/GoalsList';
import GoalsByUser from './Users/GoalsByUser/GoalsByUser';
import UserList from './Users/UserList/UserList';

function App() {

  useEffect( ()=>{
    async function init(){
      const states = await getStates();
      sessionStorage.setItem('purchaseState', JSON.stringify(states));
      
      const reasons = await getReasons();
      sessionStorage.setItem('reasons', JSON.stringify(reasons));
    }
    init()
  },[])
  
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/"element={<Container />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="registerClient/:isAdminCreator" element={<UserRegister />}></Route>
        <Route path="infoClient/:isAdminCreator" element={<UserRegister />}></Route>
        <Route path="shoppingCart" element={<ShoppingCartContainer />}></Route>
        <Route path="manageOrders" element={ <ManageOrdersContainer /> }>
          <Route path="charts" index element={<ChartsContainer />}></Route>
          <Route path="listOrders" element={<OrderCardList />}></Route>
          <Route path="detail/:detailId" element={<DetailOrder />}></Route>
          <Route path="inventory" element={<InventoryList />}></Route>
          <Route path="inventoryDetail/:inventoryId/:add" element={<Movements />}></Route>
          <Route path="products" element={<ProductList />}></Route>
          <Route path="productDetail/:productId" element={<ProductDetail />}></Route>
          <Route path="pendingApprovals" element={<PendingApprovals />}></Route>
          <Route path="userList" element={<UserList />}></Route>
          <Route path="registerUser/:isAdminCreator" element={<UserRegister />}></Route>
          <Route path="goals" element={<GoalsList />}></Route>
          <Route path="goalDetail" element={<GoalsByUser />}></Route>
        </Route>
        <Route path="manageOrdersUser" element={ <ManageOrdersUserContainer /> }>
          <Route path="listOrders" element={<OrderUserList />}> </Route>
          <Route path="detail/:detailId" element={<DetailOrder />}></Route>
        </Route>
        <Route path="manageOrdersDelivery" element={ <ManageOrdersDeliveryContainer /> }>
          <Route path="listOrders" element={<OrderDeliveryList />}> </Route>
          <Route path="detail/:detailId" element={<DetailOrder />}></Route>
        </Route>
      </Routes>
      <Outlet />
    </HashRouter>
  );
}
export default App;
