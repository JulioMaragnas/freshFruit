import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./InventoryList.css";
import { Table, Tag, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getListInventory, movementProduct } from '../../requestInventory';


function InventoryList(params) {
  const [inventoryList, setInventoryList] = useState([]);
  const navigate = useNavigate();
  
  useEffect(()=>{
    async function init() {
      const res = await getListInventory();
      const dataSource = res.map(product => (
        {
          ...product, 
          productDescription: `${product.productos.nombre} - ${product.productos.descripcion}`,
          valUnitario: product.productos.valorproduccionunitario
        }))
      setInventoryList(dataSource);
    }
    init();
  }, []);
  
  const handleEditInventory = (inventoryId)=>{
    navigate(`../inventoryDetail/${inventoryId}`)
  }
  const handleMovement = (inventoryId)=>{
    async function inactivateInventory(id) {
      const res = await movementProduct(id)
    }
    inactivateInventory();
  }

  const columns = [
    {
      title: "C\xF3digo inventario",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Producto",
      dataIndex: "productDescription",
      key: "productDescription",
    },
    {
      title: "Existencias",
      dataIndex: "existencias",
      key: "existencias",
    },
    {
      title: "Valor unitario",
      dataIndex: "valUnitario",
      key: "valUnitario",
      render: (text, record)=> `$${text}`
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a key="edit" onClick={()=> handleEditInventory(record.id)}> Editar </a>
          <a key="inactivate" onClick={()=> handleMovement(record.id)}> Inactivar </a>
        </Space>
      ),
    },
  ];
  
  return (
    <div className="w-100">
      <div className="w-100 display-flex-row inventory-list_button--create">
        <button onClick={()=> handleEditInventory(0)} className="container_button">
          <PlusOutlined />
          <span> Crear inventario </span>
        </button>
      </div>
      <Table columns={columns} dataSource={inventoryList} />
    </div>
  );
}

export default InventoryList;

