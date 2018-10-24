import { requestConstants } from '../_constants';
import { alertActions } from './';
import { history } from '../_helpers';
import { requestService } from '../_services';

export const requestActions = {
  newRide
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
  function failure() { return { type: requestConstants.NEW_RIDE_FAILURE }}
}
