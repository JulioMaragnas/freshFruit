import React from 'react'
import { Link } from "react-router-dom";
import './OrderCard.css'
import sendIcon from '../../Assets/sendIcon.png';
import detailOrderIcon from '../../Assets/detailOrderIcon.png';

function OrderCard({order}) {
    return(
        <section className="w-100 order-card">
            <div className="w-100 display-flex-row order-card_header order-card_header--no-margin">
                <h4> { order.nombreUsuario } - { order.nombreTienda } </h4>
                <h2> {order.estado} </h2>
            </div>
            <div className="w-100 display-flex-row order-card_detail">
                <div className="order-card_info">
                    <h3> { order.direccion } </h3>
                    <h3> {order.fecha} </h3>
                </div>
                <div className="order-card_info">
                    <h3> { order.notas && 'Notas' } </h3>
                    <p>{order.notas} </p>
                </div>
                <div className="display-flex-row order-card_info order-card_info--right">
                    <button className="container_button mr-10">
                        <img src={detailOrderIcon} alt="ver detalle" />
                        <span> ver detalle </span>
                    </button>
                    <Link to="detail/2">
                        <button className="container_button">
                            <img src={sendIcon} alt="ver detalle" />
                            <span> Validar compra </span>
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default OrderCard;