import React from "react";
import './ProgressBar.css'

function ProgressBar(params) {
  return (
    <div class="progress-bar">
      <ul class="progress-bar_list">
        <li class="progress-bar_item--active">Pedido recibido </li>
        <li>Orden generada</li>
        <li>En proceso</li>
        <li>Entregado</li>
      </ul>
    </div>
  );
}

export default ProgressBar;
