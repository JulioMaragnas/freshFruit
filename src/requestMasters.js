import { HeaderParameters } from "./Utils/HeaderParameters";
import {message } from "antd";

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

async function getGoals() {
  const params = HeaderParameters("GET");
  return fetch(
    `http://freshfruitparametrization-env.eba-n3ch7jpn.us-east-1.elasticbeanstalk.com/metas/`,
    params
  )
    .then((goals) => goals.json())
    .catch((err) => []);
}

async function createGoal(goal) {
  const params = HeaderParameters("POST", goal);
  return fetch(
    `http://freshfruitparametrization-env.eba-n3ch7jpn.us-east-1.elasticbeanstalk.com/metas/`,
    params
  )
    .then((res) => res.text())
    .then(data => {
      try {
        const { status, message: text } = JSON.parse(data);
        findErrorCode(status) && (message.warning(text));
        return false;
      } catch (error) {}
      return true;
    })
    .catch((err) => []);
}

function findErrorCode(code){
  const httpCodes = [400,409];
  return httpCodes.some(src => src === code)
}

export { 
  getStates,
  getReasons,
  getGoals,
  createGoal
};
