import { HeaderParameters } from "./Utils/HeaderParameters";

async function createPurchase(purchase) {
  const listaProductos = purchase.products.map(
    ({ idproducto: id, cantidadAgregada: cantidad }) => ({ id, cantidad })
  );
  
  const params = HeaderParameters("POST", { idMotivo: 1, listaProductos })
  
  return fetch(
    "http://localhost:8088/freshfruitventas/api/ventas/",
    params
  ).then((p)=> console.log(p))
  .catch(err => console.log('error',err));
}

export {
  createPurchase
}
