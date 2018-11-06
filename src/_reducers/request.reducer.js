import { requestConstants } from '../_constants';

const initState = {
  mySharedRides: [],
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
    case requestConstants.MYSHAREDRIDES_SUCCESS:
      return {
        ...state,
        mySharedRides: action.shared_rides
      };
    case requestConstants.UPDATEREQ_SUCCESS:
      return {
        ...state,
        myRides: updateList(state.myRides, action),
        myRideReqs: updateList(state.myRideReqs, action)
      }
    case requestConstants.UPDATERIDE_SUCCESS:
      return {
        ...state,
        mySharedRides: updateList(state.mySharedRides, action)
      }
    default:
      return state
  }
  function updateList(rideList, action) {
    return rideList.map(ridereq => {
      if (action.id == ridereq._id) {
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
