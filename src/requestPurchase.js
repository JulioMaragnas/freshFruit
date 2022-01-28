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

  // return [
  //   {
  //     id: 1,
  //     idusuario: 1,
  //     fecha: "2021-01-10",
  //     valortotal: "64500",
  //     idestado: 1,
  //     idusuariorepartidor: 12,
  //     notas:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem officiis libero dicta accusamus optio omnis rerum asperiores',
  //     usuario:{
  //       idestado:'',
	// 	    idrol:'',
	// 	    nombreusuario:'JulioCano',
	// 	    nombre:'Julio Alberto Cano Lopez',
	// 	    correoelectronico:'',
	// 	    celular:'',
	// 	    direccion:'calle 62',
  //     }
  //   },
  //   {
  //     id: 2,
  //     idusuario: 1,
  //     fecha: "2021-01-10",
  //     valortotal: "64500",
  //     idestado: 1,
  //     idusuariorepartidor: 12,
  //     notas:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem officiis libero dicta accusamus optio omnis rerum asperiores",
  //       usuario:{
  //         idestado:'',
  //         idrol:'',
  //         nombreusuario:'JulioCano',
  //         nombre:'Julio Alberto Cano Lopez',
  //         correoelectronico:'',
  //         celular:'',
  //         direccion:'calle 62',
  //       }
  //   },
  //   {
  //     id: 3,
  //     idusuario: 1,
  //     fecha: "2021-01-10",
  //     valortotal: "64500",
  //     idestado: 1,
  //     idusuariorepartidor: 12,
  //     notas:"",
  //     usuario:{
  //       idestado:'',
	// 	    idrol:'',
	// 	    nombreusuario:'JulioCano',
	// 	    nombre:'Julio Alberto Cano Lopez',
	// 	    correoelectronico:'',
	// 	    celular:'',
	// 	    direccion:'calle 62',
  //     }
  //   },
  //   {
  //     id: 4,
  //     idusuario: 1,
  //     fecha: "2021-01-10",
  //     valortotal: "64500",
  //     idestado: 1,
  //     idusuariorepartidor: 12,
  //     notas: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem officiis libero dicta accusamus optio omnis rerum asperiores",
  //     usuario:{
  //       idestado:'',
	// 	    idrol:'',
	// 	    nombreusuario:'JulioCano',
	// 	    nombre:'Julio Alberto Cano Lopez',
	// 	    correoelectronico:'',
	// 	    celular:'',
	// 	    direccion:'calle 62',
  //     }
  //   },
  // ];
}

async function checkStatePurchase(purchase, nextState = 'EN_PROCESO') {
  debugger;
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

export { 
  createPurchase,
  getPurchaseByStateId,
  checkStatePurchase
};
