import React from "react";
import './CardBilling.css';
import sendIcon from '../../Assets/sendIcon.png';

function CardBilling() {
	return(
		<div className="w-100 card-billing">
			<h1 className="card-billing_value--center"> $##### </h1>
			<section className="card-billing_detail">
				<h4 className="card-billing_label"> Direcci&oacute;n de env&iacute;o </h4>
				<h2 className="card-billing_address"> Calle 21 # 37-60 </h2>
				<h4 className="card-billing_label"> Direcci&oacute;n de env&iacute;o </h4>
				<h2 className="card-billing_name"> Calle 21 # 37-60 </h2>
				<h4 className="card-billing_label"> Informaci&oacute;n adicional </h4>
				<textarea className="card-billing_additional-info" name="" id="" cols="50" rows="5"></textarea>
				<div className="display-flex-row card-billing_button-container">
					<button className="container_button">
						<img src={sendIcon} alt="send" />
	                    <span> Generar pedido </span>
					</button>
				</div>
			</section>
		</div>
	)
}

export default CardBilling