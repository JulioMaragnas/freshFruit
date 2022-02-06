import { HeaderParameters } from "./Utils/HeaderParameters";

async function createPurchase(purchase, notas) {
  const listaProductos = purchase.products.map(
    ({ idproducto: idProducto, cantidadAgregada: cantidad }) => ({ idProducto, cantidad })
  );

  const params = HeaderParameters("POST", { idMotivo: 1, listaProductos, notas });

  return fetch(
    "http://freshfruitsales-env.eba-f32yfvma.us-east-1.elasticbeanstalk.com/ventas/",
    params
  ).then((res)=> res.text())
  .then(data => data)
  .catch(err => console.log('error',err));
}

async function getPurchaseByStateId(stateId) {
  const params = HeaderParameters("GET");
  return fetch(`http://freshfruitsales-env.eba-f32yfvma.us-east-1.elasticbeanstalk.com/ventas/obtenerListaVentasPorEstado/${stateId}?paginaActual=0&paginacion=10000`, params)
    .then(data => data.json())
    .then(({lista}) => lista)
    .catch((err) => []);
}

async function checkStatePurchase(purchase, nextState = 'EN_PROCESO') {
  const request = (endpoint, payload)=>{ 
    const params = HeaderParameters("PUT", payload);
    return fetch(
      `http://freshfruitsales-env.eba-f32yfvma.us-east-1.elasticbeanstalk.com${endpoint}`,
      params
    ).then(res => res)
    .catch(err => console.log('error',err));
  }
  
  const swState ={
    ['EN_PROCESO']: ()=> request('/ventas/marcarEnProceso/', purchase),
    ['DESPACHADO']: ()=> request('/ventas/marcarDespachado/', purchase),
    ['RECHAZADO']: ()=> request('/ventas/marcarRechazado/', purchase),
    ['ENTREGADO']: ()=> request('/ventas/marcarEntregado/', purchase),
    ['DEVUELTO']: ()=> request('/ventas/marcarDevuelto/', purchase),
  }
    
  return swState[nextState]()
}

async function getDetailPurchase(detailId) {
  const params = HeaderParameters("GET");
  return fetch(
    `http://freshfruitsales-env.eba-f32yfvma.us-east-1.elasticbeanstalk.com/ventas/obtenerDetallesVenta/${detailId}`,
    params
  ).then(res => res.json())
  .then(detail =>{
    return detail
  })
  .catch(err => console.log('error',err));
  
}

async function getPurchaseByUserId(userId) {
  const params = HeaderParameters("GET");
  return fetch(`http://freshfruitsales-env.eba-f32yfvma.us-east-1.elasticbeanstalk.com/ventas/obtenerListaVentasPorUsuario/${userId}?paginaActual=0&paginacion=10000`, params)
    .then(data => data.json())
    .then(({lista}) => lista)
    .catch((err) => []);
}

async function getPurchaseByDeliveryId(deliveryId) {
  const params = HeaderParameters("GET");
  return fetch(`http://freshfruitsales-env.eba-f32yfvma.us-east-1.elasticbeanstalk.com/ventas/obtenerVentasPorRepartidor/${deliveryId}?paginaActual=0&paginacion=10000`, params)
    .then(data => data.json())
    .then(({lista}) => lista)
    .catch((err) => []);
}



export { 
  createPurchase,
  getPurchaseByStateId,
  getDetailPurchase,
  checkStatePurchase,
  getPurchaseByUserId,
  getPurchaseByDeliveryId
};
