import * as AuthActions from './auth.action';

export type AuthState = {
  isLoading: boolean;
  user: any;
  authenticated: boolean;
  roles: any;
  permissions: any;
  error: any;
  customError: any;
};

const initialState: AuthState = {
  isLoading: false,
  user: null,
  authenticated: false,
  roles: [],
  permissions: [],
  error: null,
  customError: null,
};

// function mapProjectRolesToUserRoles(projectRoles, userRoles) {
//   return Object.entries(projectRoles).reduce((result, [name, role]) => ({
//     ...result,
//     [name]: userRoles.includes(role._id),
//   }), {});
// }

// function getUserRoles(projectRoles) {
//   return Object.keys(projectRoles).reduce((result, name) => ({
//     ...result,
//     [name]: name === 'anonymous',
//   }), {});
// }

const authReducer = (state: AuthState = initialState, action: AuthActions.AuthActionTypes) => {
  switch (action.type) {
    case AuthActions.RESET_USER:
      return initialState;

    case AuthActions.CLEAR_USER_ERROR:
      return {
        ...state,
        error: null,
        customError: null,
      };

    case AuthActions.USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        // is: getUserRoles(state.roles),
        error: action.payload.error,
      };

    case AuthActions.USER_FAILURE_CUSTOM:
      return {
        ...state,
        isLoading: false,
        customError: action.payload.error,
      };

    case AuthActions.REQUEST_USER:
      return {
        ...state,
        isLoading: true,
      };

    case AuthActions.REQUEST_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        authenticated: true,
        error: null,
        customError: null,
      };

    case AuthActions.AUTH_CHECK:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        authenticated: true,
        // is: mapProjectRolesToUserRoles(state.roles, action.user.roles),
        error: null,
        customError: null,
      };

    case AuthActions.EXTEND_SESSION:
      return {
        ...state,
        isLoading: true,
      };

    case AuthActions.EXTEND_SESSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        customError: null,
      };

    default:
      return state;
  }
};

export default authReducer;
