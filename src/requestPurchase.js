import { HeaderParameters } from "./Utils/HeaderParameters";

async function createPurchase(purchase) {
  debugger
  const listaProductos = purchase.products.map(
    ({ idproducto: idProducto, cantidadAgregada: cantidad }) => ({ idProducto, cantidad })
  );

  const params = HeaderParameters("POST", { idMotivo: 1, listaProductos });

  return fetch(
    "http://localhost:8089/freshfruitventas/api/ventas/",
    params
  ).then((res)=> res.text())
  .then(data => data)
  .catch(err => console.log('error',err));
}

async function getPurchaseByStateId(stateId) {
  const params = HeaderParameters("GET");
  return fetch(`http://localhost:8089/freshfruitventas/api/ventas/obtenerListaVentasPorEstado/${stateId}?paginaActual=0&paginacion=10000`, params)
    .then(data => data.json())
    .then(({lista}) => lista)
    .catch((err) => []);
}

async function checkStatePurchase(purchase, nextState = 'EN_PROCESO') {
  const request = (endpoint, payload)=>{ 
    const params = HeaderParameters("PUT", payload);
    return fetch(
      `http://localhost:8089/freshfruitventas/api${endpoint}`,
      params
    ).then(res => res)
    .catch(err => console.log('error',err));
  }
  
  const swState ={
    ['EN_PROCESO']: ()=> request('/ventas/marcarEnProceso/', purchase),
    ['DESPACHADO']: ()=> request('/ventas/marcarDespachado/', purchase),
    ['RECHAZADO']: ()=> request('/ventas/marcarRechazado/', purchase),
  }
    
  return swState[nextState]()
}

async function getDetailPurchase(detailId) {
  const params = HeaderParameters("GET");
  return fetch(
    `http://localhost:8089/freshfruitventas/api/ventas/obtenerDetallesVenta/${detailId}`,
    params
  ).then(res => res.json())
  .then(detail =>{
    return detail
  })
  .catch(err => console.log('error',err));
  
}

export { 
  createPurchase,
  getPurchaseByStateId,
  getDetailPurchase,
  checkStatePurchase
};
