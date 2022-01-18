import './App.css';
import "antd/dist/antd.css";
import Navbar from './Shared/Navbar/Navbar';
import Container from './Shopping/Container/Container';
import { Route, Routes, Outlet } from "react-router-dom";
import ShoppingCartContainer from './ShoppingCart/ShoppingCartContainer';
import ManageOrdersContainer from './ManageOrders/ManageOrdersContainer';
import OrderCardList from './ManageOrders/OrderCardList/OrderCardList';
import DetailOrder from './ManageOrders/DetailOrder/DetailOrder';
import InventoryContainer from './Inventory/InventoryContainer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" index element={<Container />}></Route>
        <Route path="shoppingCart" element={<ShoppingCartContainer />}></Route>
        <Route path="manageOrders" element={ <ManageOrdersContainer /> }>
          <Route path="list" element={<OrderCardList />}></Route>
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
