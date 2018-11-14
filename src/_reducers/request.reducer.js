import { requestConstants } from '../_constants';

const initState = {
  mySharedRides: [],
  myRides: [],
  myRideReqs: [],
  myHistory: {
    asDriver: [],
    asRider: []
  }
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
    case requestConstants.MYHISTORY_SUCCESS:
      return {
        ...state,
        myHistory: action.history
      };
    case requestConstants.UPDATEREQ_SUCCESS:
      return {
        ...state,
        myRides: updateList(state.myRides, action),
        myRideReqs: updateList(state.myRideReqs, action)
      };
    case requestConstants.UPDATERIDE_SUCCESS:
      return {
        ...state,
        mySharedRides: updateList(state.mySharedRides, action)
      };
    case requestConstants.DASH_REFRESHED:
      return {
        ...state,
        myRides: action.results.rides,
        myRideReqs: action.results.ridereqs,
        mySharedRides: action.results.shared_rides
      };
    case requestConstants.DELETERIDE_SUCCESS:
      return {
        ...state,
        mySharedRides: removeFromList(state.mySharedRides, action)
      };
    default:
      return state;
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
  function removeFromList(rideList, action) {
    return rideList.filter(ride => {
      if (action.id != ride._id) return ride;
    });
  }
}
