import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, Button } from 'antd';
import './OrderCard.css'
import sendIcon from '../../Assets/sendIcon.png';
import detailOrderIcon from '../../Assets/detailOrderIcon.png';

function OrderCard({order}) {
    const { confirm:confirmModal  } = Modal;
    const navigate = useNavigate();
    const [buttontitle, setButtontitle] = useState('');
    
    useEffect(()=>{
        const {estado: {codigo}} = order;
        const swStateCode = {
            ['CREADO']: ()=> 'Validar pedido',
            ['EN_PROCESO']: ()=> 'Despachar pedido',
            ['DESPACHADO']: ()=> 'Pedido entregado'
        }
        if(swStateCode[codigo]) setButtontitle(swStateCode[codigo]())
    },[])
    
    const handleRoute = (purchaseOrderId)=> navigate(`../detail/${purchaseOrderId}`);
    const handleChangeState = ()=>{
        confirmModal({
            title: 'Esta orden va a pasar de estado, estás seguro?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() {
              console.log('OK');
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
    // const getNextStateId = (stateCode)=>{
    //     const swStateId ={
    //         ['CREADO']: ()=> findId('EN_PROCESO'),
    //         ['EN_PROCESO']: ()=> findId('DESPACHADO'),
    //         ['DESPACHADO']: ()=> findId('ENTREGADO')
    //     }
    //     if (swStateCode[stateCode]) return swStateCode[stateCode]();
    // }
    // const findId = (stateCode)=> {
    //     const states = sessionStorage.getItem('purchaseState') ? JSON.parse(sessionStorage.getItem('purchaseState')) : [];
    //     const { id } = states.find(state => state.codigo === stateCode);
    //     return id
    // }
    
    
    return(
        <section className="w-100 order-card">
            <div className="w-100 display-flex-row order-card_header order-card_header--no-margin">
                <h4> { order.usuario.nombre } - { order.usuario.nombreTienda } </h4>
                <h2> {order.estado.descripcion} </h2>
            </div>
            <div className="w-100 display-flex-row order-card_detail">
                <div className="order-card_info">
                    <h3> { order.usuario.direccion } </h3>
                    <h3> {order.fecha} </h3>
                </div>
                <div className="order-card_info">
                    <h3> { order.notas && 'Notas' } </h3>
                    <p>{order.notas} </p>
                </div>
                <div className="display-flex-row order-card_info order-card_info--right">
                    <button onClick={()=> handleRoute(order.id)} className="container_button mr-10">
                        <img src={detailOrderIcon} alt="ver detalle" />
                        <span> ver detalle </span>
                    </button>
                    <button onClick={handleChangeState} className="container_button">
                        <img src={sendIcon} alt="ver detalle" />
                        <span> {buttontitle} </span>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default OrderCard;