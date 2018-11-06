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
  updateRide,
  updateRideReq
};

function newRide(rideInfo) {
  const auth_header = authHeader();
  const requestOptions = {
    method: 'PUT',
    headers: { ...auth_header, 'Content-Type': 'application/json' },
    body: JSON.stringify(rideInfo)
  };
  return fetch(`${config.apiUrl}/api/requests/ride`, requestOptions)
    .then(sharedServices.handleResponse);
}

function newRideReq(reqInfo) {
  const auth_header = authHeader();
  const requestOptions = {
    method: 'PUT',
    headers: { ...auth_header, 'Content-Type': 'application/json' },
    body: JSON.stringify(reqInfo)
  };
  return fetch(`${config.apiUrl}/api/requests/ridereq`, requestOptions)
    .then(sharedServices.handleResponse);
}

function searchRides(request) {
  const auth_header = authHeader();
  const requestOptions = {
    method: 'POST',
    headers: { ...auth_header, 'Content-Type': 'application/json' },
    body: JSON.stringify(request)
  };
  return fetch(`${config.apiUrl}/api/requests/rides`, requestOptions)
    .then(sharedServices.handleResponse);
}

function findMyRides(reqInfo) {
  console.log(reqInfo);
  const auth_header = authHeader();
  const requestOptions = {
    method: 'POST',
    headers: { ...auth_header, 'Content-Type': 'application/json' },
    body: JSON.stringify(reqInfo)
  };
  return fetch(`${config.apiUrl}/api/requests/myrides`, requestOptions)
    .then(sharedServices.handleResponse);
}

function findMyRideReqs(reqInfo) {
  const auth_header = authHeader();
  const requestOptions = {
    method: 'POST',
    headers: { ...auth_header, 'Content-Type': 'application/json' },
    body: JSON.stringify(reqInfo)
  };
  return fetch(`${config.apiUrl}/api/requests/myridereqs`, requestOptions)
    .then(sharedServices.handleResponse);
}

function findMySharedRides(reqInfo) {
  const auth_header = authHeader();
  const requestOptions = {
    method: 'POST',
    headers: { ...auth_header, 'Content-Type': 'application/json' },
    body: JSON.stringify(reqInfo)
  };
  return fetch(`${config.apiUrl}/api/requests/sharedrides`, requestOptions)
    .then(sharedServices.handleResponse);
}

function updateRide(rideUpdate) {
  const auth_header = authHeader();
  const requestOptions = {
    method: 'POST',
    headers: { ...auth_header, 'Content-Type': 'application/json' },
    body: JSON.stringify(rideUpdate)
  };
  return fetch(`${config.apiUrl}/api/requests/ride`, requestOptions)
    .then(sharedServices.handleResponse);
}

function updateRideReq(reqInfo) {
  const auth_header = authHeader();
  const requestOptions = {
    method: 'POST',
    headers: { ...auth_header, 'Content-Type': 'application/json' },
    body: JSON.stringify(reqInfo)
  };
  return fetch(`${config.apiUrl}/api/requests/ridereq`, requestOptions)
    .then(sharedServices.handleResponse);
}
