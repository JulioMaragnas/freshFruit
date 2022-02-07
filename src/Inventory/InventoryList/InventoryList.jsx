import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./InventoryList.css";
import { Table, Tag, Space } from "antd";
import { PlusOutlined, PlusSquareOutlined,MinusSquareOutlined, CloseSquareOutlined, EyeOutlined } from "@ant-design/icons";
import { getListInventory, movementProduct } from '../../requestInventory';
import ModalMovementDetail from '../MovementDetail/MovementDetail';
;



function InventoryList(params) {
  const [inventoryList, setInventoryList] = useState([]);
  const [inventoryId, setInventoryId] = useState(0);
  const [isMovementsVisible, setIsMovementsVisible] = useState(false);
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
    navigate(`../inventoryDetail/${inventoryId}/1`)
  }
  const handleMovement = (inventoryId)=>{
    navigate(`../inventoryDetail/${inventoryId}/0`)
  }
  
  const handleShowDetail = (id)=>{
    debugger
    setInventoryId(id)
    setIsMovementsVisible(true)
  }
  
  const handleModal = ()=> setIsMovementsVisible(false)

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
      title: 'Acciones',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a key="inactivate" onClick={()=> handleShowDetail(record.id)} title="algoo "> <EyeOutlined /> </a>
          <a key="edit" onClick={()=> handleEditInventory(record.id)}> <PlusSquareOutlined /> </a>
          <a key="inactivate" onClick={()=> handleMovement(record.id)}> <MinusSquareOutlined /> </a>
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
      <ModalMovementDetail inventoryId={inventoryId} isVisible={isMovementsVisible} handleModal={handleModal}/>
    </div>
  );
}

export default InventoryList;

