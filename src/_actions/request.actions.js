import { requestConstants, alertConstants } from '../_constants';
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
  findMyHistory,
  rateRide,
  updateRide,
  updateRideReq,
  dashboard_refresh,
  deleteRide
};

function newRide(rideInfo, user) {
  return dispatch => {
    dispatch(loading('load_car'));
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
        err => dispatch(alertActions.error(err.toString()))
      );
  };
  function success() { return { type: requestConstants.NEW_RIDE_SUCCESS }}
}

function newRideReq(rideInfo, user, comments) {
  return dispatch => {
    dispatch(loading('load_car'));
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
        err => dispatch(alertActions.error(err.toString()))
      )
  };
  function success() { return { type: requestConstants.NEW_RIDEREQ_SUCCESS }}
}

function searchRides(criteria, user) {
  return dispatch => {
    dispatch(loading('load_car'));
    requestService.searchRides({ criteria })
      .then(
        (data) => {
          dispatch(success(data));
        },
        err => {
          dispatch(alertActions.error(err.toString()));
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
    dispatch(loading('load_car'));
    requestService.findMyRides({ username: user.username }).then(
        (data) => dispatch(success(data)),
        err => dispatch(alertActions.error(err.toString()))
      );
  };
  function success(data) { return { type: requestConstants.MYRIDES_SUCCESS, rides: data }}
}

function findMyRideReqs(user) {
  return dispatch => {
    dispatch(loading('load_car'));
    requestService.findMyRideReqs({ username: user.username }).then(
        (data) => dispatch(success(data)),
        err => dispatch(alertActions.error(err.toString()))
      );
  };
  function success(data) { return { type: requestConstants.MYRIDEREQS_SUCCESS, ridereqs: data }}
}

function findMySharedRides(user) {
  return dispatch => {
    requestService.findMySharedRides({ username: user.username }).then(
        (data) => dispatch(success(data)),
        err => dispatch(alertActions.error(err.toString()))
      );
  };
  function success(data) { return { type: requestConstants.MYSHAREDRIDES_SUCCESS, shared_rides: data }}
}

function findMyHistory(username) {
  return dispatch => {
    dispatch(loading('load_car'));
    requestService.findMyHistory({ username: username }).then(
        (data) => dispatch(success(data)),
        err => dispatch(alertActions.error(err.toString()))
      );
  };
  function success(data) { return { type: requestConstants.MYHISTORY_SUCCESS, history: data }}
}

function dashboard_refresh(user) {
  var results = { rides: [], ridereqs: [], shared_rides: []};
  var counter = 0;
  return dispatch => {
    dispatch(loading('load_car'));
    requestService.findMyRides({ username: user.username }).then(
        (data) => {
          results.rides = data;
          checkComplete();
        },
        err => { dispatch(alertActions.error(err.toString())); checkComplete();}
      );
    requestService.findMyRideReqs({ username: user.username }).then(
        (data) => {
          results.ridereqs = data;
          checkComplete();
        },
        err => { dispatch(alertActions.error(err.toString())); checkComplete();}
      );
    requestService.findMySharedRides({ username: user.username }).then(
        (data) => {
          results.shared_rides = data;
          checkComplete();
        },
        err => { dispatch(alertActions.error(err.toString())); checkComplete();}
      );
    function checkComplete() {
      counter += 1;
      if (counter == 3) dispatch(success(results));
    }
  };
  function success(data) { return { type: requestConstants.DASH_REFRESHED, results: data }}
}

function updateRide(rideId, updates) {
  return dispatch => {
    dispatch(loading('load_car'));
    requestService.updateRide({ rideId, updates }).then(
        () => dispatch(success()),
        err => dispatch(alertActions.error(err.toString()))
      );
  };
  function success() { return { type: requestConstants.UPDATERIDE_SUCCESS, id: rideId, updates }}
}

function updateRideReq(ridereqId, updates) {
  return dispatch => {
    dispatch(loading('load_car'));
    requestService.updateRideReq({ ridereqId, updates }).then(
        () => dispatch(success()),
        err => dispatch(alertActions.error(err.toString()))
      );
  };
  function success() { return { type: requestConstants.UPDATEREQ_SUCCESS, id: ridereqId, updates }}
}

function rateRide(reqInfo) {
  return dispatch => {
    dispatch(loading('load_car'));
    requestService.rateRide(reqInfo).then(
        () => dispatch(success()),
        err => dispatch(alertActions.error(err.toString()))
      );
  };
  function success() { return { type: requestConstants.RATERIDE_SUCCESS, id: reqInfo.id, updates: reqInfo.updates }}
}

function deleteRide(rideId) {
  return dispatch => {
    dispatch(loading('load_car'));
    requestService.deleteRide({ delete_one: true, rideId }).then(
        () => dispatch(success()),
        err => dispatch(alertActions.error(err.toString()))
      );
  };
  function success() { return { type: requestConstants.DELETERIDE_SUCCESS, id: rideId }}
}

function loading(circle_type) { return { type: alertConstants.LOADING, circle_type: circle_type }}
