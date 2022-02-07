import { HeaderParameters } from "./Utils/HeaderParameters";
import {message } from "antd";
import { OrderMonths } from './Utils/OrderMonths';

async function getUserInfo() {
  const params = HeaderParameters("GET");
  return fetch(
    `http://freshfruitusers-env.eba-tma2vuyz.us-east-1.elasticbeanstalk.com/usuarios/obtenerUsuarioSesion`,
    params
  )
    .then((res) => res.json())
    .then(user => {
      sessionStorage.setItem('userInfo', JSON.stringify(user))
      return user;
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
    `http://freshfruitinventary.us-east-1.elasticbeanstalk.com/usuarios/login`,
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
    `http://freshfruitusers-env.eba-tma2vuyz.us-east-1.elasticbeanstalk.com/usuarios/login`,
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
    return true
  })
  .catch((err) => console.log("error", err));
}

async function createNewClient(newClient) {
  const params = HeaderParameters("POST", newClient);
  return fetch(
    `http://freshfruitusers-env.eba-tma2vuyz.us-east-1.elasticbeanstalk.com/usuarios/insertarCliente`,
    params
  )
    .then((res) => res.text())
    .then(res => {
      try {
        const { status, message: text } = JSON.parse(res);
        status === 400 && (message.warning(text));
        return false;
      } catch (error) {}
      return true
    })
    .catch((err) => console.log("error", err));
}

async function createNewUser(newUser, registerType) {
  const type = registerType == 1 ? 'insertarAdmin' : 'insertarRepartidor';
  const params = HeaderParameters("POST", newUser);
  return fetch(
    `http://freshfruitusers-env.eba-tma2vuyz.us-east-1.elasticbeanstalk.com/usuarios/${type}`,
    params
  )
    .then((res) => res.text())
    .then(res => {
      try {
        const { status, message: text } = JSON.parse(res);
        status === 400 && (message.warning(text));
        return false;
      } catch (error) {}
      return true
    })
    .catch((err) => console.log("error", err));
}

async function updateStateClient(action, userId) {
  const params = HeaderParameters("PUT");
  return fetch(
    `http://freshfruitusers-env.eba-tma2vuyz.us-east-1.elasticbeanstalk.com/usuarios/${action}/${userId}`,
    params
  )
    .then((res) => res.text())
    .then(res => {
      try {
        const { status, message: text } = JSON.parse(res);
        status === 400 && (message.warning(text));
        return false;
      } catch (error) {}
      return true
    })
    .catch((err) => console.log("error", err));
  
}

async function getPendingApprovals() {
  const params = HeaderParameters("GET");
  return fetch(
    `http://freshfruitusers-env.eba-tma2vuyz.us-east-1.elasticbeanstalk.com/usuarios/obtenerListaPendientes?paginaActual=0&paginacion=1000`,
    params
  )
    .then((res) => res.json())
    .then(({lista}) => lista)
    .catch((err) => console.log("error", err));
}

async function getGoalsByUser() {
  const params = HeaderParameters("GET");
  return fetch(
    `http://freshfruitusers-env.eba-tma2vuyz.us-east-1.elasticbeanstalk.com/usuarios/obtenerMetasUsuarioSesion`,
    params
  )
    .then((res) => res.json())
    .then(lista => {
        const years = lista.map(goal => {
          const dateGoal = new Date(goal.fechaInicio);
          return dateGoal.getFullYear()
        })
        .filter((year, index, self)=> self.indexOf(year) === index);
        
        const goalsByYear = years.map(year => {
          const months = lista.filter(x => {
            const date = new Date(x.fechaInicio);
            return date.getFullYear() === year;
          })
          .map(month => {
            const date = new Date(month.fechaInicio)
            return OrderMonths().find(m => m.order === (date.getMonth() + 1))
          });
          const resultMonths = [...new Map(months.map(item => [item['code'], item])).values()];
          return ({
            year,
            months : resultMonths
          })        
        });
        return goalsByYear.map(year =>({
         ...year,
         months: year.months.map(month => ({
          ...month,
          goals: lista.filter(goal=> {
            const date = new Date(goal.fechaInicio);
            return (date.getMonth() + 1) === month.order
          })
          .sort((a,b)=> b.order - a.order)
          .map(({nombreMeta: name, cantidadAlcanzada, cantidadAlcanzar}) => ({name, percentage: Math.floor((cantidadAlcanzada * 100)/cantidadAlcanzar)}))
         }))
        }))
    })
    .catch((err) => console.log("error", err));
}

async function getDelivers() {
  const deliversSS = JSON.parse(sessionStorage.getItem('delivers')) || [];
  if(deliversSS && deliversSS.length) return deliversSS
  const params = HeaderParameters("GET");
  return fetch(
    `http://freshfruitusers-env.eba-tma2vuyz.us-east-1.elasticbeanstalk.com/usuarios/obtenerListaRepartidores`,
    params
  )
    .then((res) => res.json())
    .then((lista) => {
      sessionStorage.setItem('delivers', JSON.stringify(lista));
      return lista
    })
    .catch((err) => console.log("error", err));
}

async function getUserList() {
  const params = HeaderParameters("GET");
  return fetch(
    `http://freshfruitusers-env.eba-tma2vuyz.us-east-1.elasticbeanstalk.com/usuarios/?paginaActual=0&paginacion=1000`,
    params
  )
    .then((res) => res.json())
    .then(({lista}) => lista)
    .catch((err) => console.log("error", err));
}

export {
    getUserInfo,
    getTemporalToken,
    login,
    createNewClient,
    updateStateClient,
    createNewUser,
    getPendingApprovals,
    getGoalsByUser,
    getDelivers,
    getUserList
}
