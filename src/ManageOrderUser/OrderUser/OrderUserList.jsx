import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Table, Space } from "antd";
import {  EyeOutlined } from "@ant-design/icons";
import { getPurchaseByUserId } from '../../requestPurchase';

function OrderUserList() {
  const [orderList, setOrderList] = useState([]);
  const navigate = useNavigate();
  
  useEffect(()=>{
    async function init() {
      const {id} = JSON.parse(sessionStorage.getItem('userInfo'));
      const res = await getPurchaseByUserId(id);

      const dataSource = res.map(order => (
        {
          ...order, 
          estado: order.estado.descripcion
        }))
      setOrderList(dataSource);
    }
    init();
  }, []);

  const handleRoute = (purchaseOrderId)=> navigate(`../detail/${purchaseOrderId}`);

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
        </Space>
      ),
    },
  ];
  
  return (
    <div className="w-100">
      <center><h1>Mis compras</h1></center>
      <Table columns={columns} dataSource={orderList} />
    </div>
  );
}

export default OrderUserList;

