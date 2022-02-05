import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import './CardBilling.css';
import sendIcon from '../../Assets/sendIcon.png';
import { CartContext } from '../../PerformaceHooks/useCart';
import { createPurchase } from '../../requestPurchase';
import format from 'format-number'

var myFormat = format({ prefix: '$' });

function CardBilling() {
	const userlogged = JSON.parse(sessionStorage.getItem('userlogged'));
	const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
	const [ cart, setCart ] = useContext(CartContext);
	const [notes, setNotes] = useState('');
  
	const navigate = useNavigate();
	const handlePurchase = async ()=>{
	    if (!userlogged) {
	      navigate('../login');
	      return
	    }
		const resPurchase = await createPurchase(cart, notes);
		message.success(resPurchase);
		setCart({...cart, products: [], total:0});
		navigate('/')
	}
	
	const handleNotesChange = ({target:{ value }})=> setNotes(value)

	return(
		<div className="w-100 card-billing">
			<h5 className="card-billing_value--center"><span style={{'opacity': '60%'}}> Valor Total: </span>  {`${myFormat(cart.total)}`}</h5>
			<section className="card-billing_detail">
			    {
			      userlogged && (
			        <div>
		                <h4 className="card-billing_label"> Direcci&oacute;n de env&iacute;o </h4>
		                <h2 className="card-billing_address"> { userInfo.direccion } </h2>
		                <h4 className="card-billing_label"> Pedido a nombre de </h4>
		                <h2 className="card-billing_name"> {`${userInfo.nombre} - ${userInfo.nombretienda || ''}`} </h2>
		                <h4 className="card-billing_label"> Informaci&oacute;n adicional </h4>
		                <textarea className="mt-10 card-billing_additional-info" name="" id="" cols="50" rows="5" onChange={handleNotesChange} value={notes}></textarea>
			        </div>
			      )
			    }
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