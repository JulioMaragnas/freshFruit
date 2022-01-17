import React from 'react';
import './DetailOrderCard.css';
import imageReference from '../../../Assets/imageReference.png';

function DetailOrderCard(params) {
    return(
        <section className="detail-order-card">
            <img className="w-100 detail-order-card_image--border-radius" src={imageReference} alt="" />
            <h3>COD ###</h3>
            <p>
                <span>Descripcion:</span> Lorem ipsum dolor sit amet
            </p>
            <p> <span>Cantidad:</span> </p>
            <div className="display-flex-row detail-order-card_check--right">
                <input type="checkbox" name="" id="" />
            </div>
        </section>
    )
}

export default DetailOrderCard;