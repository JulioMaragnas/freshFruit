import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Space } from "antd";
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
      dataIndex: "descripcion",
      key: "descripcion",
    },
    {
      title: "Valor de producci\xF3n",
      dataIndex: "valorproduccionunitario",
      key: "valorproduccionunitario",
      render: (text, record) => `$${text || 0}`
    },
    {
      title: "Precio de venta",
      dataIndex: "precio",
      key: "precio",
      render: (text, record) => `$${text || 0}`
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
  const [originalList, setOriginalList] = useState([]);
  const [searchParam, setSearchParam] = useState('');
  const navigate = useNavigate();
  const handleEditProduct = (inventoryId)=>{
    navigate(`../productDetail/${inventoryId}`)
  }
  const handleSearchChange = ({target: { value }})=> {
    setSearchParam(value.trim());
    const param = value.trim().toLowerCase();
    value.length && setProductList(originalList.filter(product => product.nombre.toLowerCase().indexOf(param) >= 0 || product.descripcion.toLowerCase().indexOf(param) >= 0))
    !value.length && setProductList(originalList.map(product => product))
  }
  
  useEffect(()=>{
    async function init(){
      const res = await getListProducts();
      setProductList(res);
      setOriginalList(res)
    }
    init();
  },[])
  
  return(
    <div className="w-100">
      <div className="w-100 display-flex-row product-list_button--create">
        <input className='product-list_search--margin-right' type="text" placeholder='Busca el producto' value={searchParam} onChange={handleSearchChange}/>
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