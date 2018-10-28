import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { mapState } from './mapState.reducer';
import { rideRequests } from './request.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  mapState,
  rideRequests
});

export default rootReducer;
