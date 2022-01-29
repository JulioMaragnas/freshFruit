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

async function getDelivers() {
  return [
    {
      id: 1,
      idestado: 0,
      idrol: 0,
      nombre: "Deliver 1",
    },
    {
      id: 2,
      idestado: 0,
      idrol: 0,
      nombre: "Deliver 2",
    },
    {
      id: 3,
      idestado: 0,
      idrol: 0,
      nombre: "Deliver 3",
    },
    {
      id: 4,
      idestado: 0,
      idrol: 0,
      nombre: "Deliver 4",
    },
    {
      id: 5,
      idestado: 0,
      idrol: 0,
      nombre: "Deliver 5",
    },
    {
      id: 6,
      idestado: 0,
      idrol: 0,
      nombre: "Deliver 6",
    },
    {
      id: 7,
      idestado: 0,
      idrol: 0,
      nombre: "Deliver 7",
    }
  ]
}

export {
    getUserInfo,
    getTemporalToken,
    login,
    getDelivers
}