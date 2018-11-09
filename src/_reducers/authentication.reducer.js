import { userConstants } from '../_constants';
import { userService } from '../_services';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    case userConstants.UPDATEUSER_SUCCESS:
      const newUser = {
        ...state.user,
        ...action.updates
      };
      userService.setUser(newUser);
      return {
        ...state,
        user: newUser
      };
    default:
      return state;
  }
}
