import { HeaderParameters } from "./Utils/HeaderParameters";

async function getStates() {
  const params = HeaderParameters("GET");
  // return fetch(
  //   `http://localhost:8088/freshfruitventas/api/obtenerListaVentasPorEstado/${stateId}`,
  //   params
  // )
  //   .then((purchaseList) => purchaseList.json())
  //   .catch((err) => console.log("error", err));
  
  return [
    {
      id: 1,
      codigo: 'CREADO',
      descripcion: 'CREADO'
    },
    {
      id: 2,
      codigo: 'EN_PROCESO',
      descripcion: 'EN PROCESO'
    },
    {
      id: 3,
      codigo: 'RECHAZADO',
      descripcion: 'RECHAZADO'
    },
    {
      id: 4,
      codigo: 'DESPACHADO',
      descripcion: 'DESPACHADO'
    },
    {
      id: 5,
      codigo: 'ENTREGADO',
      descripcion: 'ENTREGADO'
    },
    {
      id: 6,
      codigo: 'DEVUELTO',
      descripcion: 'DEVUELTO'
    }
  ]
}

export {
  getStates
};
