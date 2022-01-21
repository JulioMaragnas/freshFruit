import { HeaderParameters } from "./Utils/HeaderParameters";

async function getUserInfo() {
  const params = HeaderParameters("GET");
  // return fetch(
  //   `http://localhost:8088/freshfruitventas/api/obtenerListaVentasPorEstado/${stateId}`,
  //   params
  // )
  //   .then((purchaseList) => purchaseList.json())
  //   .catch((err) => console.log("error", err));
  
  return {
    id: 1,
    nombreUsuario: 'Cliente###',
    nombre: 'Julio Alberto Cano Lopez',
    nombreTienda: 'Legumbrería paraíso',
    correoElectronico: 'julioalbertocano@gmail.com',
    celular: '3217717939',
    direccion: 'calle 61 # 56-51'
  }
}

export {
    getUserInfo 
}