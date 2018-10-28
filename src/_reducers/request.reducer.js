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
    case requestConstants.UPDATEREQ_SUCCESS:
      return {
        myRides: updateList(state.myRides, action),
        myRideReqs: updateList(state.myRideReqs, action)
      }
    default:
      return state
  }
  function updateList(rideList, action) {
    return rideList.map(ridereq => {
      if (action.ridereqId == ridereq._id) {
        const updates = action.updates;
        ridereq = {
          ...ridereq,
          ...updates
        };
      }
      return ridereq;
    });
  }
}
