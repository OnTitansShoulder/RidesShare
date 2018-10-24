import { requestConstants } from '../_constants';

const initState = {
  location: {
    lat: 29.643677,
    lng: -82.354975
  }
};

export default mapRequest(state = initState, action) {
  switch (action.type) {
    case requestConstants.UPDATE_MAP_CENTER:
      return {
        currLocation: state.location
      };
    default:
      return state
  }
}
