import { requestConstants } from '../_constants';
import { alertActions } from './';
import { history } from '../_helpers';
import { requestService } from '../_services';

export const requestActions = {
  newRide,
  searchRides
};

function newRide(rideInfo, user) {
  console.log(rideInfo);
  return dispatch => {
    dispatch(request());
    rideInfo = {
      ...rideInfo,
      username: user.username
    };
    var newObj = {rideInfo, token: user.token};
    console.log(newObj);
    requestService.newRide({rideInfo, token: user.token})
      .then(
        () => {
          dispatch(success());
          history.push('/dashboard');
        },
        err => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request() { return { type: requestConstants.NEW_RIDE_SENT }}
  function success() { return { type: requestConstants.NEW_RIDE_SUCCESS }}
  function failure(msg) { return { type: requestConstants.NEW_RIDE_FAILURE, message: msg }}
}

function searchRides(criteria, user) {
  console.log(criteria);
  return dispatch => {
    dispatch(request());
    var req = {
      criteria,
      token: user.token
    };
    requestService.searchRides(req)
      .then(
        (data) => {
          dispatch(success(data));
        },
        err => {
          dispatch(failure(error.toString()));
        }
      )
  };

  function request() { return {
    type: requestConstants.SEARCHING_RIDES
  }}
  function success(data) { return {
    type: requestConstants.SEARCH_RIDES_SUCCESS,
    rides: data
  }}
  function failure(msg) { return {
    type: requestConstants.SEARCH_RIDES_FAILURE,
    message: msg
  }}
}
