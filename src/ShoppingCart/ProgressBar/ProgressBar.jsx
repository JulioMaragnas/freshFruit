import React from "react";
import './ProgressBar.css'

function ProgressBar(params) {
  return (
    <div className="w-100">
      <ul className="progress-bar_list">
        <li className="progress-bar_item--active">Pedido recibido </li>
        <li >Orden generada</li>
        <li>En proceso</li>
        <li>Entregado</li>
      </ul>
    </div>
  );
}

export default ProgressBar;
