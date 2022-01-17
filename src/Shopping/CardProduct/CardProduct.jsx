import React from 'react'
import './CardProduct.css'
import imageReference from '../../Assets/imageReference.png'
import carIcon from '../../Assets/carIcon.png';
import infoIcon from '../../Assets/infoIcon.png'

function CardProduct ({product}) {

    const handleCart = ()=>{
        debugger;
        let cart = sessionStorage.getItem('cardProduct') ? JSON.parse(sessionStorage.getItem('cardProduct')) : [] ;
        cart = !cart.length ? [...cart, {...product, cantidad: 1}] : cart  ;
        cart = cart.reduce((src, p)=>{
            p.cantidad = p.id === product.id ? p.cantidad + 1 : p.cantidad;
            return [...src, p]
        }, []);
        sessionStorage.setItem('cardProduct', JSON.stringify(cart))
        
    }
    
    return(
        <section className="card-product">
             <img className="w-100 image--br-5" src={imageReference} alt="" />
             <h3 className="card-product_code">COD {product.id}</h3>
             <p>{product.descripcion}</p>
             <div className="w-100 mt-10 card-product_button-container">
                 <button className="card-product_button--center container_button">
                    <img src={infoIcon} alt="" />
                    <span>Informaci&oacute;n</span>
                </button>
                <button className="card-product_button--add container_button" onClick={handleCart}>
                    <img src={carIcon} alt="" />  
                    <span>Agregar</span> 
                </button>
             </div>
        </section>
    )
}
export default CardProduct;