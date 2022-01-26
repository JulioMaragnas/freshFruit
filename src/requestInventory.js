import { HeaderParameters } from './Utils/HeaderParameters'

async function getListInventory(param) {

  const params = HeaderParameters('GET')

  return fetch('http://localhost:8088/freshfruitinventory/api/inventarios/', params)
    .then(res => res.json())
    .catch(err => console.log('err', err))

  // return [
  //   {
  //     existencias: 10,
  //     id: 1,
  //     idproducto: 1,
  //     productos: {
  //       descripcion: "Pulpa de fresa",
  //       id: 1,
  //       imagen: "1.png",
  //       nombre: "Fresa",
  //       precio: 4600,
  //       valorproduccionunitario: 2500
  //     }
  //   },
  //   {
  //     existencias: 10,
  //     id: 2,
  //     idproducto: 2,
  //     productos: {
  //       descripcion: "Pulpa de mango",
  //       id: 2,
  //       imagen: "2.png",
  //       nombre: "",
  //       precio: 5200,
  //       valorproduccionunitario: 2500
  //     }
  //   }
  // ];
}

async function movementProduct(movement){
  const params = HeaderParameters('POST', movement)

  return fetch('http://localhost:8088/freshfruitinventory/api/inventarios/', params)
    .then(res => res.json())
    .catch(err => console.log('err', err));
}

async function getInventoryById(inventoryId){
  const params = HeaderParameters('GET')

  return fetch(`http://localhost:8088/freshfruitinventory/api/inventarios/${inventoryId}`, params)
    .then(res => res.json())
    .then(res => {
      if(res.status) return {};
      return res;
    })
    .catch(err => console.log('err', err))
  
  // return {
  //   existencias: 10,
  //   id: 1,
  //   idproducto: 1,
  //   productos: {
  //     descripcion: "Pulpa de fresa",
  //     id: 1,
  //     imagen: null,
  //     nombre: "Fresa",
  //     precio: 4600,
  //     valorproduccionunitario: 2500
  //   }
  // }
}

async function getListProducts(){
  const params = HeaderParameters('GET')

  return fetch(`http://localhost:8088/freshfruitinventory/api/productos/?paginaActual=0&paginacion=1000`, params)
    .then(res => res.json())
    .then(({lista}) => lista)
    .catch(err => console.log('err', err))
  // return[
  //   {
  //     descripcion: "Pulpa de fresa",
  //     id: 1,
  //     imagen: null,
  //     nombre: 'Fresa',
  //     precio: 4600,
  //     valorproduccionunitario: 2500
  //   },
  //   {
  //     descripcion: "Pulpa de mango",
  //     id: 2,
  //     imagen: null,
  //     nombre: "Mango",
  //     precio: 5300,
  //     valorproduccionunitario: 2500
  //   }
  // ]
}

async function getProductById(productId) {
  const params = HeaderParameters('GET')

  return fetch(`http://localhost:8088/freshfruitinventory/api/productos/${productId}`, params)
  .then(res => res.json())
  .then((res) => res)
  .catch(err => console.log('err', err));
}

async function createAndUpdateProduct(product, isUpdate) {
  const params = HeaderParameters(isUpdate ? 'PUT' : 'POST',product)

  return fetch(`http://localhost:8088/freshfruitinventory/api/productos/`, params)
  .then(res => res.json())
  .then((res) => res)
  .catch(err => console.log('err', err));
}


export { 
  getListInventory,
  movementProduct,
  getInventoryById,
  getListProducts,
  getProductById,
  createAndUpdateProduct
} 