import React, {useState, useEffect, useContext} from "react";
import "../ManageOrdersContainer.css";
import OrderCard from '../OrderCard/OrderCard';
import { getPurchaseByStateId } from '../../requestPurchase';
import { StatePurchaseContext } from '../../PerformaceHooks/useStatePurchase';


function OrderCardList() {
  const [orders, setOrders] = useState([]);
  const [purchaseStateId, setPurchaseStateId] = useContext(StatePurchaseContext)
  
  const init = async ()=> {
    const states = sessionStorage.getItem('purchaseState') ? JSON.parse(sessionStorage.getItem('purchaseState')) : [];
    const res = await getPurchaseByStateId(purchaseStateId);
    const orderList = res.map(purchase => (
      {
        ...purchase, 
        estado : states.find(state => state.id ===  purchase.idestado) || null
      })
    )
    setOrders(orderList);
  }
  
  useEffect(()=>{
    init();
  },[purchaseStateId])
  
  const handleRefresh = async ()=> init();
  
  return (
    <div className="w-100 order-list">
      { 
        !orders.length && <h2 className="no-data"> En el momento no hay pedidos en este estado </h2>
      }
      {
        orders.map(order => (<OrderCard order={order} refreshList={handleRefresh} key={order.id} />))
      }
    </div>
  );
}
export default OrderCardList;