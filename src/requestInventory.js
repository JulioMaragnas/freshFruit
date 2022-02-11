import { HeaderParameters } from './Utils/HeaderParameters';
import { OrderMonths } from './Utils/OrderMonths';
import {message } from "antd";

async function getListInventory(param) {

  const params = HeaderParameters('GET')

  return fetch('http://freshfruitinventary.us-east-1.elasticbeanstalk.com/inventarios/', params)
    .then(res => res.json())
    .catch(err => console.log('err', err))
}

async function movementProduct(movement, action){
  const params = HeaderParameters('POST', movement)

  return fetch(`http://freshfruitinventary.us-east-1.elasticbeanstalk.com/inventarios/${action}`, params)
    .then(res => res.json())
    .catch(err => console.log('err', err));
}

async function getInventoryById(inventoryId){
  const params = HeaderParameters('GET')

  return fetch(`http://freshfruitinventary.us-east-1.elasticbeanstalk.com/inventarios/${inventoryId}`, params)
    .then(res => res.json())
    .then(res => {
      if(res.status) return {};
      return res;
    })
    .catch(err => console.log('err', err));
}

async function getListProducts(){
  const params = HeaderParameters('GET')

  return fetch(`http://freshfruitinventary.us-east-1.elasticbeanstalk.com/productos/?paginaActual=0&paginacion=1000`, params)
    .then(res => res.json())
    .then(({lista}) => lista)
    .catch(err => console.log('err', err));
}

async function getProductById(productId) {
  const params = HeaderParameters('GET')

  return fetch(`http://freshfruitinventary.us-east-1.elasticbeanstalk.com/productos/${productId}`, params)
  .then(res => res.json())
  .then((res) => res)
  .catch(err => console.log('err', err));
}

async function createAndUpdateProduct(product, isUpdate) {
  const params = HeaderParameters(isUpdate ? 'PUT' : 'POST',product)

  return fetch(`http://freshfruitinventary.us-east-1.elasticbeanstalk.com/productos/`, params)
  .then(res => res.text())
  .then((res) => {
    try {
      const { status, message: text } = JSON.parse(res);
      findErrorCode(status) && (message.warning(text));
      return false;
    } catch (error) {}
    return res
  })
  .catch(err => console.log('err', err));
}

function findErrorCode(code){
  const httpCodes = [400,409];
  return httpCodes.some(src => src === code)
}

function getListMovementsById(inventoryId) {
  const params = HeaderParameters('GET')

  return fetch(`http://freshfruitinventary.us-east-1.elasticbeanstalk.com/inventarios/obtenerListaMovimientosInventario/${inventoryId}`, params)
  .then(res => res.json())
  .then((res) => res)
  .catch(err => console.log('err', err));
  
}

async function getDataForChart() {
  const params = HeaderParameters('GET')

  return fetch(`http://freshfruitparametrization-env.eba-n3ch7jpn.us-east-1.elasticbeanstalk.com/dashboard/`, params)
  .then(res => res.json())
  .then((res) => res)
  .catch(err => console.log('err', err));
}

function calculatePurchaseByMonth(consolidated) {
  return consolidated
    .map(purchase =>{
      debugger
      const m = OrderMonths().find(month => {
        debugger
        const r = month.name.toLowerCase().indexOf(purchase.mes.toLowerCase() === 0)
        return purchase.mes.toLowerCase().indexOf(month.name.toLowerCase()) === 0
      });
      return {...purchase, ...OrderMonths().find(month => month.name.toLowerCase().indexOf(purchase.mes.toLowerCase() === 0))}
    })
    .sort((ma, mb)=> ma.order - mb.order)
    .reduce((accum, month, index, thisArr)=>{
      debugger
      accum[0].push(month.name);
      accum[1].push(month.numeroVentas)
      return accum;
    },[[], []])
}


export { 
  getListInventory,
  movementProduct,
  getInventoryById,
  getListProducts,
  getProductById,
  createAndUpdateProduct,
  getListMovementsById,
  getDataForChart,
  calculatePurchaseByMonth
} 