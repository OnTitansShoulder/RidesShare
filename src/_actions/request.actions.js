import { requestConstants } from '../_constants';
import { alertActions } from './';
import { history } from '../_helpers';
import { requestService } from '../_services';

export const requestActions = {
  newRide,
  searchRides,
  newRideReq,
  findMyRides,
  findMyRideReqs,
  findMySharedRides,
  updateRide,
  updateRideReq
};

function newRide(rideInfo, user) {
  return dispatch => {
    dispatch(request());
    rideInfo = {
      ...rideInfo,
      username: user.username
    };
    requestService.newRide({ rideInfo })
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

function newRideReq(rideInfo, user, comments) {
  return dispatch => {
    dispatch(request());
    var reqInfo = {
      rideId: rideInfo._id,
      fromAddress: rideInfo.fromAddress,
      toAddress: rideInfo.toAddress,
      leavingDate: rideInfo.leavingDate,
      driver: rideInfo.username,
      driverName: rideInfo.fullname,
      rider: user.username,
      riderName: user.firstname + ' ' + user.lastname,
      comments: comments,
      status: 'PENDING'
    };
    requestService.newRideReq({ reqInfo })
      .then(
        () => {
          dispatch(success());
        },
        err => {
          dispatch(failure(error.toString()));
        }
      )
  };

  function request() { return { type: requestConstants.NEW_RIDEREQ_SENT }}
  function success() { return { type: requestConstants.NEW_RIDEREQ_SUCCESS }}
  function failure(msg) { return { type: requestConstants.NEW_RIDEREQ_FAILURE, message: msg }}
}

function searchRides(criteria, user) {
  return dispatch => {
    dispatch(request());
    requestService.searchRides({ criteria })
      .then(
        (data) => {
          dispatch(success(data));
        },
        err => {
          dispatch(failure(error.toString()));
        }
      );
  };

  function request() { return { type: requestConstants.SEARCHING_RIDES }}
  function success(data) { return {
    type: requestConstants.SEARCH_RIDES_SUCCESS,
    rides: data
  }}
  function failure(msg) { return {
    type: requestConstants.SEARCH_RIDES_FAILURE,
    message: msg
  }}
}

function findMyRides(user) {
  return dispatch => {
    dispatch(request());
    requestService.findMyRides({ username: user.username }).then(
        (data) => dispatch(success(data)),
        err => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: requestConstants.MYRIDES_SENT }}
  function success(data) { return { type: requestConstants.MYRIDES_SUCCESS, rides: data }}
  function failure(msg) { return { type: requestConstants.MYRIDES_FAILURE, message: msg }}
}

function findMyRideReqs(user) {
  return dispatch => {
    dispatch(request());
    requestService.findMyRideReqs({ username: user.username }).then(
        (data) => dispatch(success(data)),
        err => dispatch(failure(error.toString()))
      );
  };
  function request() { return { type: requestConstants.MYRIDEREQS_SENT }}
  function success(data) { return { type: requestConstants.MYRIDEREQS_SUCCESS, ridereqs: data }}
  function failure(msg) { return { type: requestConstants.MYRIDEREQS_FAILURE, message: msg }}
}

function findMySharedRides(user) {
  return dispatch => {
    requestService.findMySharedRides({ username: user.username }).then(
        (data) => dispatch(success(data)),
        err => console.log(error.toString())
      );
  };
  function success(data) { return { type: requestConstants.MYSHAREDRIDES_SUCCESS, shared_rides: data }}
}

function updateRide(rideId, updates) {
  return dispatch => {
    requestService.updateRide({ rideId, updates }).then(
        () => dispatch(success()),
        err => console.log(error.toString())
      );
  };
  function success() { return { type: requestConstants.UPDATERIDE_SUCCESS, id: rideId, updates }}
}

function updateRideReq(ridereqId, updates) {
  return dispatch => {
    dispatch(request());
    requestService.updateRideReq({ ridereqId, updates }).then(
        () => dispatch(success()),
        err => dispatch(failure(error.toString()))
      );
  };
  function request() { return { type: requestConstants.UPDATEREQ_SENT }}
  function success() { return { type: requestConstants.UPDATEREQ_SUCCESS, id: ridereqId, updates }}
  function failure(msg) { return { type: requestConstants.UPDATEREQ_FAILURE, message: msg }}
}
