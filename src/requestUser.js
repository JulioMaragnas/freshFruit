import { HeaderParameters } from "./Utils/HeaderParameters";
import {message } from "antd";

async function getUserInfo() {
  const params = HeaderParameters("GET");
  return fetch(
    `http://localhost:8090/freshfruitusuarios/api/usuarios/obtenerUsuarioSesion`,
    params
  )
    .then((res) => res.json())
    .then(user => {
      sessionStorage.setItem('userInfo', JSON.stringify(user))
    })
    .catch((err) => console.log("error", err));
  
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

async function getTemporalToken() {
  
  const params = {
    headers: {
      Accept: "application/json"
    },
    method: 'POST',
  };
  
  return fetch(
    `http://localhost:8088/freshfruitinventory/api/usuarios/login`,
    params
  )
    .then((data) => data.text())
    .then(token => {
      const [,part] = token.split(' ')
      sessionStorage.setItem('token',part);
      sessionStorage.setItem('userlogged',false);
    })
    .catch((err) => console.log("error", err));
 }

async function login(userInfo){
  const params = {
    headers: {
      Accept: "application/json",
      ["Content-Type"]: 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(userInfo)
  }
  return fetch(
    `http://localhost:8090/freshfruitusuarios/api/usuarios/login`,
    params
  )
  .then((res) => res.text())
  .then(token =>{
    debugger;
    try {
      const { status, message: text } = JSON.parse(token);
      status === 400 && (message.warning(text));
      return false;
    } catch (error) {}
    const [,part] = token.split(' ');
    sessionStorage.setItem('token',part);
    sessionStorage.setItem('userlogged',true);
    getUserInfo();
    return true
  })
  .catch((err) => console.log("error", err));
}

export {
    getUserInfo,
    getTemporalToken,
    login
}