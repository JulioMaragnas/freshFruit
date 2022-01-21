import React from 'react';
import { Link } from "react-router-dom";
import './DetailOrder.css';
import goBackIcon from '../../Assets/goBackIcon.png';
import sendIcon from '../../Assets/sendIcon.png';
import cancelIcon from '../../Assets/cancelIcon.png';
import DetailOrderCard from './DetailOrderCard/DetailOrderCard';

import previousIcon from '../../Assets/previousIcon.png';
import nextIcon from '../../Assets/nextIcon.png';

function DetailOrder(params) {
    return(
        <section className="w-100 detail-order">
            <div className="w-100 detail-order_controls">
                <Link to="../list">
                    <button className="container_button">
                        <img src={goBackIcon} alt="volver a la lista" />
                        <span> volver a la lista </span>
                    </button>
                </Link>
                {/* <div className="detail-order_container">
                    <button className="container_button mr-10">
                        <img src={previousIcon} alt="Anterior" />
                        <span>Anterior</span>
                    </button>
                    <button className="container_button">
                        <img src={nextIcon} alt="Siguiente" />
                        <span>Siguiente</span>
                    </button>
                </div> */}
            </div>
            <div className="w-100 display-flex-row detail-order_list-products">
                <DetailOrderCard />
                <DetailOrderCard />
                <DetailOrderCard />
            </div>
            <div className="w-100 mt-10 detail-order_footer">
                <button className="container_button mr-10">
                    <img src={cancelIcon} alt="Cancelar" />
                    <span>Cancelar</span>
                </button>
                <button className="container_button">
                    <img src={sendIcon} alt="Validar pedido" />
                    <span>Validar pedido</span>
                </button>
            </div>
        </section>
    )
}

export default DetailOrder;