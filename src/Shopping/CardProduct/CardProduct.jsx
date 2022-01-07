import React from 'react'
import './CardProduct.css'
import imageReference from '../../Assets/imageReference.png'
import carIcon from '../../Assets/carIcon.png';
import infoIcon from '../../Assets/infoIcon.png'

function CardProduct (props) {
    return(
        <section className="card-product">
             <img className="card-product_image--full" src={imageReference} alt="" />
             <h3 className="card-product_code">COD #####</h3>
             <p>Lorem ipsum dolor sit amet, elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, elit, sed do eiusmod tempor</p>
             <div className="card-product_button-container">
                 <button className="card-product_button--info card-product_button--center card-product_button--style">
                    <img className="card-product_icon" src={infoIcon} alt="" />
                    <span className="card-product_button--title">Informaci&oacute;n</span>
                </button>
                <button className="card-product_button--add card-product_button--style">
                    <img className="card-product_icon" src={carIcon} alt="" />  
                    <span className="card-product_button--title">Agregar</span> 
                </button>
             </div>
        </section>
    )
}
export default CardProduct;