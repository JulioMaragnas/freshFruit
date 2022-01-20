import { HeaderParameters } from './Utils/HeaderParameters'

async function returnProducts(param) {

  const params = HeaderParameters('GET')

  return fetch('http://localhost:8088/freshfruitinventory/api/inventarios/', params)
    .then(res => res.json())
    .catch(err => console.log('err', err))

  // return [
  //   {
  //     existencias: 10,
  //     id: 1,
  //     idproducto: 0,
  //     productos: {
  //       descripcion: "Pulpa de papaya",
  //       id: 1,
  //       imagen: "papaya.jpg",
  //       nombre: "Papaya",
  //       precio: 5200,
  //       valorproduccionunitario: 2500
  //     }
  //   },
  //   {
  //     existencias: 10,
  //     id: 2,
  //     idproducto: 0,
  //     productos: {
  //       descripcion: "Pulpa de banano",
  //       id: 2,
  //       imagen: "banano.jpg",
  //       nombre: "Banano",
  //       precio: 5200,
  //       valorproduccionunitario: 2500
  //     }
  //   }
  // ];
}




export { 
  returnProducts
} 