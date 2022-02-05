import { HeaderParameters } from "./Utils/HeaderParameters";

async function getStates() {
  const params = HeaderParameters("GET");
  return fetch(
    `http://freshfruitinventary.us-east-1.elasticbeanstalk.com/estados/`,
    params
  )
    .then((states) => states.json())
    .catch((err) => []);
}

async function getReasons() {
  const params = HeaderParameters("GET");
  return fetch(
    `http://freshfruitinventary.us-east-1.elasticbeanstalk.com/motivos/`,
    params
  )
    .then((reasons) => reasons.json())
    .catch((err) => []);
}

export { 
  getStates,
  getReasons
};
