import { HeaderParameters } from './Utils/HeaderParameters'

async function getListInventory(param) {

  const params = HeaderParameters('GET')

  // return fetch('http://localhost:8088/freshfruitinventory/api/inventarios/', params)
  //   .then(res => res.json())
  //   .catch(err => console.log('err', err))

  return [
    {
      existencias: 10,
      id: 1,
      idproducto: 1,
      productos: {
        descripcion: "Pulpa de fresa",
        id: 1,
        imagen: "1.png",
        nombre: "Fresa",
        precio: 4600,
        valorproduccionunitario: 2500
      }
    },
    {
      existencias: 10,
      id: 2,
      idproducto: 2,
      productos: {
        descripcion: "Pulpa de mango",
        id: 2,
        imagen: "2.png",
        nombre: "",
        precio: 5200,
        valorproduccionunitario: 2500
      }
    }
  ];
}

async function movementProduct(){
  const params = HeaderParameters('GET')

  // return fetch('http://localhost:8088/freshfruitinventory/api/inventarios/', params)
  //   .then(res => res.json())
  //   .catch(err => console.log('err', err))
  
  return true;
}

async function getInventoryById(inventoryId){
  const params = HeaderParameters('GET')

  // return fetch(`http://localhost:8088/freshfruitinventory/api/inventarios/${inventoryId}`, params)
  //   .then(res => res.json() ? res.json(): {})
  //   .catch(err => console.log('err', err))
  
  return {
    existencias: 10,
    id: 1,
    idproducto: 1,
    productos: {
      descripcion: "Pulpa de fresa",
      id: 1,
      imagen: null,
      nombre: "Fresa",
      precio: 4600,
      valorproduccionunitario: 2500
    }
  }
}

async function getListProducts(){
  return[
    {
      descripcion: "Pulpa de fresa",
      id: 1,
      imagen: null,
      nombre: 'Fresa',
      precio: 4600,
      valorproduccionunitario: 2500
    },
    {
      descripcion: "Pulpa de mango",
      id: 2,
      imagen: null,
      nombre: "Mango",
      precio: 5300,
      valorproduccionunitario: 2500
    }
  ]
}

async function getProductById(productId) {
  return {
    descripcion: "Pulpa de fresa",
    id: 1,
    imagen: null,
    nombre: "Fresa",
    precio: 4600,
    valorproduccionunitario: 2500
  }
}

export { 
  getListInventory,
  movementProduct,
  getInventoryById,
  getListProducts,
  getProductById
} 