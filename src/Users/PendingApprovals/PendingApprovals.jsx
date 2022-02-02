import React, { useState, useEffect } from 'react';
import { Table, Space, message } from "antd";
import './PendingApprovals.css';
import { updateStateClient, getPendingApprovals } from '../../requestUser';


function PendingApprovals(){
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
        title: "Nombre de la tienda",
        dataIndex: "nombretienda",
        key: "nombretienda",
      },
    {
      title: "Correo electr\xF3nico",
      dataIndex: "correoelectronico",
      key: "correoelectronico",
    },
    {
        title: "Celular",
        dataIndex: "celular",
        key: "celular",
      },
    {
      title: "Direcci\xF3n de entrega",
      dataIndex: "valorproduccionunitario",
      key: "valorproduccionunitario",
      render: (text, record) => `$${text || 0}`
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a key="edit" onClick={()=> handleApproval(record.id, 'approval')}> Aprobar </a>
          <a key="edit" onClick={()=> handleApproval(record.id, 'reject')}> Rechazar </a>
          <a key="edit" onClick={()=> handleApproval(record.id, 'inactivate')}> Inactivar </a>
        </Space>
      ),
    },
  ]
  
  const [pendingApprovals, setPendingApprovals] = useState([]);
  
  const handleApproval = async (userId, action)=>{
    const sw = {
        ['approval']: (id)=> 'marcarAprobado',
        ['reject']: (id)=> 'marcarRechazado',
        ['inactivate']: (id)=> 'marcarInactivo'
    }
    const state = sw[action](userId);
    const res = await updateStateClient(state, userId);
    res && setPendingApprovals(pendingApprovals.filter(pendingUser => pendingUser.id !== userId));
    res && message('Acci\xF3n realizada con exito');
  }
    
  useEffect(()=>{
    async function init(){
      const res = await getPendingApprovals();
      setPendingApprovals(res);
    }
    init();
  },[])
  
  return(
    <div className="w-100">
        <h2 className='text-center'> Aprobacion de registro de usuarios </h2>
      <Table columns={columns} dataSource={pendingApprovals} />
    </div>
  )
}
export default PendingApprovals ;