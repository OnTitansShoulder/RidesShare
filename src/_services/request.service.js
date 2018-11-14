import config from 'config';
import { sharedServices } from './';
import { authHeader } from '../_helpers';

export const requestService = {
  newRide,
  newRideReq,
  searchRides,
  findMyRides,
  findMyRideReqs,
  findMySharedRides,
  findMyHistory,
  updateRide,
  updateRideReq,
  rateRide,
  deleteRide
};

function newRide(rideInfo) {
  const requestOptions = defaultAuthReqOptions('PUT', rideInfo);
  return fetch(`${config.apiUrl}/api/requests/ride`, requestOptions)
    .then(sharedServices.handleResponse);
}

function newRideReq(reqInfo) {
  const requestOptions = defaultAuthReqOptions('PUT', reqInfo);
  return fetch(`${config.apiUrl}/api/requests/ridereq`, requestOptions)
    .then(sharedServices.handleResponse);
}

function searchRides(request) {
  const requestOptions = defaultAuthReqOptions('POST', request);
  return fetch(`${config.apiUrl}/api/requests/rides`, requestOptions)
    .then(sharedServices.handleResponse);
}

function findMyRides(reqInfo) {
  const requestOptions = defaultAuthReqOptions('POST', reqInfo);
  return fetch(`${config.apiUrl}/api/requests/myrides`, requestOptions)
    .then(sharedServices.handleResponse);
}

function findMyRideReqs(reqInfo) {
  const requestOptions = defaultAuthReqOptions('POST', reqInfo);
  return fetch(`${config.apiUrl}/api/requests/myridereqs`, requestOptions)
    .then(sharedServices.handleResponse);
}

function findMySharedRides(reqInfo) {
  const requestOptions = defaultAuthReqOptions('POST', reqInfo);
  return fetch(`${config.apiUrl}/api/requests/sharedrides`, requestOptions)
    .then(sharedServices.handleResponse);
}

function findMyHistory(reqInfo) {
  const requestOptions = defaultAuthReqOptions('POST', reqInfo);
  return fetch(`${config.apiUrl}/api/requests/myhistory`, requestOptions)
    .then(sharedServices.handleResponse);
}

function updateRide(rideUpdate) {
  const requestOptions = defaultAuthReqOptions('POST', rideUpdate);
  return fetch(`${config.apiUrl}/api/requests/ride`, requestOptions)
    .then(sharedServices.handleResponse);
}

function updateRideReq(reqInfo) {
  const requestOptions = defaultAuthReqOptions('POST', reqInfo);
  return fetch(`${config.apiUrl}/api/requests/ridereq`, requestOptions)
    .then(sharedServices.handleResponse);
}

function rateRide(reqInfo) {
  const requestOptions = defaultAuthReqOptions('POST', reqInfo);
  return fetch(`${config.apiUrl}/api/requests/rateride`, requestOptions)
    .then(sharedServices.handleResponse);
}

function deleteRide(reqInfo) {
  const requestOptions = defaultAuthReqOptions('POST', reqInfo);
  return fetch(`${config.apiUrl}/api/requests/ride`, requestOptions)
    .then(sharedServices.handleResponse);
}

function defaultAuthReqOptions(method, body) {
  const auth_header = authHeader();
  return {
    method,
    headers: {
      ...auth_header, 'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
}
