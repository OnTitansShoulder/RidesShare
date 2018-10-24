import config from 'config';
import { sharedServices } from './';
import { authHeader } from '../_helpers';

export const requestService = {
  newRide,
  searchRides
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
