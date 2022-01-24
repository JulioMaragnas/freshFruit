import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Tag, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import './ProductList.css';
import { getListProducts } from '../../requestInventory';

function ProductList(){
  const columns = [
    {
      title: "C\xF3digo",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Descripci\xF3n",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Valor de producci\xF3n",
      dataIndex: "valorproduccionunitario",
      key: "valorproduccionunitario",
    },
    {
      title: "Precio",
      dataIndex: "precio",
      key: "precio",
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a key="edit" onClick={()=> handleEditProduct(record.id)}> Editar </a>
        </Space>
      ),
    },
  ]
  
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();
  const handleEditProduct = (inventoryId)=>{
    navigate(`../productDetail/${inventoryId}`)
  }
  
  useEffect(()=>{
    async function init(){
      const res = await getListProducts();
      setProductList(res);
    }
    init();
  },[])
  
  return(
    <div className="w-100">
      <div className="w-100 display-flex-row product-list_button--create">
        <button onClick={()=> handleEditProduct(0)} className="container_button">
          <PlusOutlined />
          <span> Crear producto </span>
        </button>
      </div>
      <Table columns={columns} dataSource={productList} />
    </div>
  )
}
export default ProductList ;