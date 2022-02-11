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
  return {
    encabezado: {
      totalVentas: 0,
      ventaMaxPedido: 0,
      cantPulpasVendidas: 0,
      totalRedenciones: 0,
      devoluciones: 0,
    },
    ventasMes: [
      {
        mes: "Enero",
        ano: 2022,
        numeroVentas: 0,
      },
      {
        mes: "Febrero",
        ano: 2022,
        numeroVentas: 0,
      },
      {
        mes: "Diciembre",
        ano: 2021,
        numeroVentas: 0,
      },
    ],
    frutasMasVendida: [
      {
        productos: {
          descripcion: "Pera",
          id: 0,
          imagen: "string",
          nombre: "string",
          precio: 0,
          valorproduccionunitario: 0,
        },
        ventas: [
          { cantidadVendida: 0, mes: "Febrero", ano: 2022 },
          { cantidadVendida: 0, mes: "Enero", ano: 2022 },
        ],
      },
      {
        productos: {
          descripcion: "piña",
          id: 0,
          imagen: "string",
          nombre: "string",
          precio: 0,
          valorproduccionunitario: 0,
        },
        ventas: [
          { cantidadVendida: 0, mes: "Febrero", ano: 2022 },
          { cantidadVendida: 0, mes: "Enero", ano: 2022 },
        ],
      },
    ],
  };
}

function calculatePurchaseByMonth(consolidated) {
  return consolidated
    .map(purchase =>({...purchase, ...OrderMonths.find(month => month.toLowerCase().indexOf(purchase.mes.toLowerCase() === 0))}))
    .sort((ma, mb)=> ma.order - mb.order)
    .reduce((accum, month)=>{
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