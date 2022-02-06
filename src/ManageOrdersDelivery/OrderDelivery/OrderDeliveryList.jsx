import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Table, Space, message } from "antd";
import {  EyeOutlined, DeliveredProcedureOutlined, RollbackOutlined} from "@ant-design/icons";
import { getPurchaseByDeliveryId , checkStatePurchase} from '../../requestPurchase';
import ModalReturnReason from "./ModalReturnReason";

function OrderDeliveryList() {
  const [orderList, setOrderList] = useState([]);
  const [idPurchaseSelect, setIdPurchaseSelect] = useState();
  const [isReasonsVisible, setIsReasonsVisible] = useState(false);
  const navigate = useNavigate();
  
  useEffect(()=>{
   
    init();
  }, []);

  const init = async () => {
    const {id} = JSON.parse(sessionStorage.getItem('userInfo'));
    const res = await getPurchaseByDeliveryId(id);

    const dataSource = res.map(order => (
      {
        ...order, 
        estado: order.estado.descripcion
      }))
    setOrderList(dataSource);
  }
  
  const handleRoute = (purchaseOrderId)=> navigate(`../detail/${purchaseOrderId}`);

  const handleDeliver = async (purchaseOrderId) => {

    const purchase = {
      idVenta: purchaseOrderId
    }
    await checkStatePurchase(purchase, 'ENTREGADO');
    message.success('Pedido entregado correctamente', 0.6);
    init();
    
  };

  const handleReturn = (purchaseOrderId) => {
    setIdPurchaseSelect(purchaseOrderId);
    setIsReasonsVisible(true);
  };

  const handleModal = async (idReason) =>{
   
    setIsReasonsVisible(false);
    if(idReason){

      const purchase = {
        idVenta: idPurchaseSelect,
        idMotivo: idReason
      }

      await checkStatePurchase(purchase, 'DEVUELTO');
      message.success('Se realizó la devolución correctamente', 0.6);
      init();
    }

  }

  const columns = [
    {
      title: "# Orden",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
    },
    {
      title: "Notas",
      dataIndex: "notas",
      key: "notas",
    },
    {
      title: "Valor compra",
      dataIndex: "valortotal",
      key: "valortotal",
      render: (text, record)=> `$${text}`
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado"
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a key="detail" onClick={()=> handleRoute(record.id)} > <EyeOutlined /> </a>
          <a key="deliver" onClick={()=> handleDeliver(record.id)}> < DeliveredProcedureOutlined/> </a>
          <a key="return" onClick={()=> handleReturn(record.id)}> <RollbackOutlined /> </a>
        </Space>
      ),
    },
  ];
  
  return (
    <div className="w-100">
      <center><h1>Mis órdenes</h1></center>
      <Table columns={columns} dataSource={orderList} />
      <ModalReturnReason  isVisible={isReasonsVisible} handleModal={handleModal}/>
    </div>
  );
}

export default OrderDeliveryList;

