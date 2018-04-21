import { userConstants } from "../_constants";
// import { userService } from "../_services";
import { alertActions } from "./";
import { history } from "../_helpers";

export const userActions = {
  login,
  logout
};

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));
    // dispatch(success({ username }));
    history.push("/dashboard");
    // userService.login(username, password).then(
    //   user => {
    //     dispatch(success(user));
    //     dispatch(alertActions.clear());
    //     history.push("/dashboard");
    //   },
    //   error => {
    //     dispatch(failure(error));
    //     dispatch(alertActions.error("Username or password is incorrect."));
    //   }
    // );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  //   userService.logout();
  return { type: userConstants.LOGOUT };
}
