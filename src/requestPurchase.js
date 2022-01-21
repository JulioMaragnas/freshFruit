import { HeaderParameters } from "./Utils/HeaderParameters";

async function createPurchase(purchase) {
  const listaProductos = purchase.products.map(
    ({ idproducto: id, cantidadAgregada: cantidad }) => ({ id, cantidad })
  );

  const params = HeaderParameters("POST", { idMotivo: 1, listaProductos });

  // return fetch(
  //   "http://localhost:8088/freshfruitventas/api/ventas/",
  //   params
  // ).then((p)=> console.log(p))
  // .catch(err => console.log('error',err));
}

async function getPurchaseByStateId(stateId) {
  // const params = HeaderParameters("GET");
  // return fetch(`http://localhost:8088/freshfruitventas/api/obtenerListaVentasPorEstado/${stateId}`, params)
  //   .then((purchaseList) => purchaseList.json())
  //   .catch((err) => console.log("error", err));

  return [
    {
      id: 1,
      idusuario: 1,
      fecha: "2021-01-10",
      valortotal: "64500",
      idestado: 1,
      idusuariorepartidor: 12,
      notas:'',
      usuario:{
        idestado:'',
		    idrol:'',
		    nombreusuario:'',
		    nombre:'',
		    clave:'',
		    correoelectronico:'',
		    celular:'',
		    direccion:'',
      }
    },
    {
      id: 2,
      idusuario: 1,
      fecha: "2021-01-10",
      valortotal: "64500",
      idestado: 1,
      idusuariorepartidor: 12,
      notas:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem officiis libero dicta accusamus optio omnis rerum asperiores",
    },
    {
      id: 3,
      idusuario: 1,
      fecha: "2021-01-10",
      valortotal: "64500",
      idestado: 1,
      idusuariorepartidor: 12,
      notas:
        "",
    },
    {
      id: 4,
      idusuario: 1,
      fecha: "2021-01-10",
      valortotal: "64500",
      idestado: 1,
      idusuariorepartidor: 12,
      notas:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem officiis libero dicta accusamus optio omnis rerum asperiores",
    },
  ];
}

export { 
  createPurchase,
  getPurchaseByStateId
};
