import React from 'react'
import { Link } from "react-router-dom";
import './OrderCard.css'
import sendIcon from '../../Assets/sendIcon.png';
import detailOrderIcon from '../../Assets/detailOrderIcon.png';

function OrderCard(params) {
    return(
        <section className="w-100 order-card">
            <div className="w-100 display-flex-row order-card_header order-card_header--no-margin">
                <h4> Julio Alberto Cano Lopez - Pan y pedazo </h4>
                <h2> Estado </h2>
            </div>
            <div className="w-100 display-flex-row order-card_detail">
                <div className="order-card_info">
                    <h3> Calle 21 # 33-14 piso 2 </h3>
                    <h3> 2022-01-15 </h3>
                </div>
                <div className="order-card_info">
                    <h3>Notas</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At impedit dicta harum hic mollitia animi vel cumque dolores ex. </p>
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