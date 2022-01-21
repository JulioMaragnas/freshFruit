import React, {useState, useEffect} from "react";
import "../ManageOrdersContainer.css";
import OrderCard from '../OrderCard/OrderCard';
import { getPurchaseByStateId } from '../../requestPurchase';


function OrderCardList() {
  const [orders, setOrders] = useState([]);
  
  useEffect(async ()=>{
    const { nombreUsuario, nombreTienda, direccion } = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {};
    const states = sessionStorage.getItem('purchaseState') ? JSON.parse(sessionStorage.getItem('purchaseState')) : {};
    const res = await getPurchaseByStateId(1);
    const orderList = res.map(purchase => (
      {
        ...purchase, 
        nombreUsuario, 
        nombreTienda, 
        estado : states.find(state => state.id ===  purchase.idestado) || null
      })
    )
    
    setOrders(orderList);
  },[])
  
  return (
    <div className="w-100">
      {
        orders.map(order => <OrderCard order={order} />)
      }
    </div>
  );
}

export default OrderCardList;
