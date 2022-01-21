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
      codigo: 'CRTD',
      descripcion: 'CREADO'
    },
    {
      id: 2,
      codigo: 'PRCS',
      descripcion: 'EN PROCESO'
    },
    {
      id: 3,
      codigo: 'RJCTD',
      descripcion: 'RECHAZADO'
    },
    {
      id: 4,
      codigo: 'DSPTCH',
      descripcion: 'DESPACHADO'
    },
    {
      id: 5,
      codigo: 'DLVRD',
      descripcion: 'ENTREGADO'
    },
    {
      id: 6,
      codigo: 'NTKN',
      descripcion: 'DEVUELTO'
    }
  ]
}

export {
  getStates
};
