import React, {useState, useEffect, useContext} from "react";
import "../ManageOrdersContainer.css";
import OrderCard from '../OrderCard/OrderCard';
import { getPurchaseByStateId } from '../../requestPurchase';
import { StatePurchaseContext } from '../../PerformaceHooks/useStatePurchase';


function OrderCardList() {
  const [orders, setOrders] = useState([]);
  const [purchaseStateId, setPurchaseStateId] = useContext(StatePurchaseContext)
  
  useEffect(()=>{
    console.log(purchaseStateId);
    async function loadInitialData(){
      const states = sessionStorage.getItem('purchaseState') ? JSON.parse(sessionStorage.getItem('purchaseState')) : {};
      const res = await getPurchaseByStateId(purchaseStateId);
      const orderList = res.map(purchase => (
        {
          ...purchase, 
          estado : states.find(state => state.id ===  purchase.idestado) || null
        })
        
        )
      setOrders(orderList);
    }
    loadInitialData();
  },[purchaseStateId])
  
  return (
    <div className="w-100">
      {
        orders.map(order => (<OrderCard order={order} key={order.id} />))
      }
    </div>
  );
}

export default OrderCardList;
