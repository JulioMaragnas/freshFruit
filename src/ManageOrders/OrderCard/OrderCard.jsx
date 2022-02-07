import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './OrderCard.css';
import sendIcon from '../../Assets/sendIcon.svg';
import detailOrderIcon from '../../Assets/detailOrderIcon.svg';
import cancelIcon from '../../Assets/cancel.svg';
import { Modal} from 'antd';
import { ExclamationCircleOutlined, UnorderedListOutlined, CloseCircleOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { checkStatePurchase } from '../../requestPurchase';
import { getDelivers } from '../../requestUser';
import ModalDeliver from '../../Shared/Modal/Modal';


function OrderCard({order, refreshList}) {
    const { confirm:confirmModal  } = Modal;
    const navigate = useNavigate();
    const [buttontitle, setButtontitle] = useState('');
    const [isDeliversVisible, setIsDeliversVisible] = useState(false);
    const [delivers, setDelivers] = useState([]);
    const [idDeliverSelected, setIdDeliverSelected] = useState(null);
    
    useEffect(()=>{
        const {estado: {codigo}} = order;
        const swStateCode = {
            ['CREADO']: ()=> 'Validar pedido',
            ['EN_PROCESO']: ()=> 'Despachar pedido',
            ['DESPACHADO']: ()=> 'Entregar pedido'
        }
        if(swStateCode[codigo]) setButtontitle(swStateCode[codigo]())
        
        async function init() {
            const res = await getDelivers()
            setDelivers(res);
        }
        init();
    },[])
    
    const handleRoute = (purchaseOrderId)=> navigate(`../detail/${purchaseOrderId}`);
    const setNextStateOrder = (idusuariorepartidor = null)=>{
        const { id: idMotivo, nextState } = getNextStateId(order.estado.codigo)
        const payload ={
            idVenta: order.id,
            idmetausuario: null,
            idusuariorepartidor,
            idMotivo
        }
        checkStatePurchase(payload, nextState).then(()=> refreshList(order.estado.codigo));
        
    }
    const handleChangeState = ()=>{
        const {estado: {codigo}} = order;
        if(codigo === 'EN_PROCESO'){
            setIsDeliversVisible(true);
            return
        }
        confirmModal({
            title: 'Esta orden va a pasar de estado, estás seguro?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk() { setNextStateOrder() },
            onCancel() { console.log('Cancel'); },
          });
    }
    const getNextStateId = (stateCode)=>{
        const swStateId ={
            ['CREADO']: ()=> findId('motivo 1', 'EN_PROCESO'),
            ['EN_PROCESO']: ()=> findId('motivo 1', 'DESPACHADO'),
            ['DESPACHADO']: ()=> findId('motivo 1', 'ENTREGADO'),
            ['ENTREGADO']: ()=> findId('motivo 1', 'ENTREGADO'),
            ['RECHAZADO']: ()=> findId('motivo 1', 'RECHAZADO'),
        }
        if (swStateId[stateCode]) return swStateId[stateCode]();
    }
    const findId = (reasonByState, nextState)=> {
        const reasons = sessionStorage.getItem('reasons') ? JSON.parse(sessionStorage.getItem('reasons')) : [];
        const { id } = reasons.find(reason => reason.descripcion === reasonByState) || {id : 1};
        
        return { id, nextState }
    }
    
    const handleModalOk = ()=>{
        setIsDeliversVisible(false);
        setNextStateOrder(idDeliverSelected)
    }
    const handleSelectDeliver = (idDeliver)=> setIdDeliverSelected(idDeliver)
    const handleModalCancel = ()=>{
        setIsDeliversVisible(false);
        setIdDeliverSelected(null);
    }
    const handleReject = ()=>{
        const { id: idMotivo, nextState } = getNextStateId('RECHAZADO')
        const payload ={
            idVenta: order.id,
            idmetausuario: null,
            idusuariorepartidor: null,
            idMotivo
        }
        checkStatePurchase(payload, nextState);
        refreshList(order.estado.codigo)
    }

    return(
        <section className="w-100 order-card">
            <div className="w-100 display-flex-row order-card_header order-card_header--no-margin">
                <h4><span className='order-card_label--blue'> Pedido #{order.id} </span> | { order.usuario.nombre } - { order.usuario.nombreTienda } </h4>
                <h2 className='order-card_label--blue'> {order.estado.descripcion} </h2>
            </div>
            <div className="w-100 display-flex-row order-card_detail">
                <div className="order-card_info">
                    <h3>Direcci&oacute;n: { order.usuario.direccion } </h3>
                    <h3>Fecha del pedido: {order.fecha} </h3>
                </div>
                <div className="order-card_info">
                    <h3 className='order-card_label--blue'> { order.notas && 'Notas' } </h3>
                    <p>{order.notas} </p>
                </div>
                <div className="display-flex-row order-card_info order-card_info--right">
                    <button onClick={()=> handleRoute(order.id)} className="container_button mr-10">
                        <UnorderedListOutlined />
                        <span> ver detalle </span>
                    </button>
                    <button onClick={()=> handleReject(order.id)} className="container_button mr-10">
                        <CloseCircleOutlined />
                        <span> Rechazar </span>
                    </button>
                    <button onClick={handleChangeState} className="container_button">
                        <CheckSquareOutlined />
                        <span> {buttontitle} </span>
                    </button>
                </div>
            </div>
            <ModalDeliver isDeliversVisible={isDeliversVisible} handleModalOk={handleModalOk} handleModalCancel={handleModalCancel} handleSelectDeliver={handleSelectDeliver} delivers={delivers}/>
        </section>
    )
}

export default OrderCard;