import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import './CardBilling.css';
import sendIcon from '../../Assets/sendIcon.png';
import { CartContext } from '../../PerformaceHooks/useCart';
import { createPurchase } from '../../requestPurchase';

function CardBilling() {
	const [ cart, setCart ] = useContext(CartContext);
  
	const navigate = useNavigate();
	const handlePurchase = async ()=>{
		await createPurchase(cart);
		alert('La venta se ha creado correctamente');
		setCart({...cart, products: [], total:0});
		navigate('/')
	}

	return(
		<div className="w-100 card-billing">
			<h1 className="card-billing_value--center">{`$ ${cart.total}`}</h1>
			<section className="card-billing_detail">
				<h4 className="card-billing_label"> Direcci&oacute;n de env&iacute;o </h4>
				<h2 className="card-billing_address"> Calle 21 # 37-60 </h2>
				<h4 className="card-billing_label"> Direcci&oacute;n de env&iacute;o </h4>
				<h2 className="card-billing_name"> Calle 21 # 37-60 </h2>
				<h4 className="card-billing_label"> Informaci&oacute;n adicional </h4>
				<textarea className="card-billing_additional-info" name="" id="" cols="50" rows="5"></textarea>
				<div className="display-flex-row card-billing_button-container">
					<button className="container_button" onClick={handlePurchase}>
						<img src={sendIcon} alt="send" />
	                    <span> Generar pedido </span>
					</button>
				</div>
			</section>
		</div>
	)
}

export default CardBilling