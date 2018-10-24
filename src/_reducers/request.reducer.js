import { requestConstants } from '../_constants';

const initState = {
  myRides: [],
  myRequests: [],
  myRideHistory: [],
  myRequestHistory: []
};

export default rideRequests(state = initState, action) {
  switch (action.type) {
    case requestConstants.REQUESTS_STATS:
      return {
        ...state
      };
    default:
      return state
  }
}
