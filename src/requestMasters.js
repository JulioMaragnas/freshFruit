import { HeaderParameters } from "./Utils/HeaderParameters";

async function getStates() {
  const params = HeaderParameters("GET");
  return fetch(
    `http://localhost:8088/freshfruitinventory/api/estados/`,
    params
  )
    .then((states) => states.json())
    .catch((err) => []);
}

async function getReasons() {
  const params = HeaderParameters("GET");
  return fetch(
    `http://localhost:8088/freshfruitinventory/api/motivos/`,
    params
  )
    .then((reasons) => reasons.json())
    .catch((err) => []);
}

export { 
  getStates,
  getReasons
};
