import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Table, Modal } from "antd";
import { getListMovementsById } from '../../requestInventory';

function ModalMovementDetail({inventoryId, isVisible, handleModal}) {
  const navigate = useNavigate();
  const [inventoryList, setInventoryList] = useState([]);
  
  useEffect(()=>{
    async function init() {
      debugger
      const reasons = JSON.parse(sessionStorage.getItem('reasons')) || []
      const res = await getListMovementsById(inventoryId)
      const movements = res.map(movement => {
        const {descripcion: motivo} = reasons.find(reason => reason.id === movement.idmotivo) || {}
        return ({...movement, motivo})
      });
      setInventoryList(movements)
    }   
    init()
  },[inventoryId])
  
  const columns = [
    {
      title: "Moviemiento",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Motivo",
      dataIndex: "motivo",
      key: "motivo",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidadmovimiento",
      key: "cantidadmovimiento",
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha"
    },
  ];
  
  return(
    <Modal
    title="Detalle movimientos de inventario "
    width={'70%'}
    visible={isVisible}
    onOk={()=> handleModal(false)}
    onCancel={()=> handleModal(false)}
    maskClosable={false}
  >
    <div className="w-100">
      <Table columns={columns} dataSource={inventoryList} />
    </div>
  </Modal>
  )
}
export default ModalMovementDetail;
