import { requestConstants } from '../_constants';

const initState = {
  myRides: [],
  myRideReqs: []
};

export function rideRequests(state = initState, action) {
  switch (action.type) {
    case requestConstants.MYRIDES_SUCCESS:
      return {
        ...state,
        myRides: action.rides
      };
    case requestConstants.MYRIDEREQS_SUCCESS:
      return {
        ...state,
        myRideReqs: action.ridereqs
      };
    default:
      return state
  }
}
