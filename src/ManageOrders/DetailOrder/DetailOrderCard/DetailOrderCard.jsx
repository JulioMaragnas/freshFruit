import React from 'react';
import './DetailOrderCard.css';

function DetailOrderCard({detailData}) {
    return(
        <section className="detail-order-card">
            <img className="w-100 detail-order-card_image--border-radius" src={detailData.productos.imagen} alt={detailData.productos.nombre} />
            <h3>COD {detailData.idproducto}</h3>
            <p> <span>Nombre:</span> {detailData.productos.nombre} </p>
            <p> <span>Descripcion:</span> {detailData.productos.descripcion} </p>
            <p> <span>Cantidad:</span> {detailData.cantidad} </p>
        </section>
    )
}

export default DetailOrderCard;