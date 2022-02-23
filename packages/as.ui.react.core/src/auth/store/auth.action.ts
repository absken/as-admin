import cookies from 'browser-cookies';

import { defaultConfig } from '../../config';
import { fetchUtils } from '../../data';
import { Next } from '../../types';

export const RESET_USER = '[Auth] Reset';
export const CLEAR_USER_ERROR = '[Auth] Clear User Error';
export const USER_FAILURE = '[Auth] User Failure';
export const USER_FAILURE_CUSTOM = '[Auth] User Failure Custom';
export const REQUEST_USER = '[Auth] Request User';
export const REQUEST_USER_SUCCESS = '[Auth] Request User Success';
export const SET_USER_ROLLS = '[Auth] Set User Rolls';
export const SET_USER_PERMISSIONS = '[Auth] Set User Permissions';
export const AUTH_CHECK = '[Auth] Auth Check';
export const EXTEND_SESSION = '[Auth] Extend Session';
export const EXTEND_SESSION_SUCCESS = '[Auth] Extend Session Success';

export const resetUserAction = () => ({
  type: RESET_USER,
});

export const clearUserErrorAction = (name) => ({
  type: CLEAR_USER_ERROR,
  name,
});

// use meta to handle an error globally
export const userFailureAction = (error) => ({
  type: USER_FAILURE,
  payload: { error },
  meta: { error },
});

export const userFailureCustomAction = (error) => ({
  type: USER_FAILURE_CUSTOM,
  payload: { error },
});

export const requestUserAction = () => ({
  type: REQUEST_USER,
});

export const requestUserSuccessAction = (user) => ({
  type: REQUEST_USER_SUCCESS,
  payload: { user },
});

export const setUserRollsAction = (roles) => ({
  type: SET_USER_ROLLS,
  payload: { roles },
});

export const setUserPermissionsAction = (permissions) => ({
  type: SET_USER_PERMISSIONS,
  payload: { permissions },
});

export const authCheckAction = (user) => ({
  type: AUTH_CHECK,
  payload: { user },
});

export const extendSessionAction = () => ({
  type: EXTEND_SESSION,
});

export const extendSessionSuccessAction = () => ({
  type: EXTEND_SESSION_SUCCESS,
});

///////////////////////////////////////////////////////////////////////////
// Side effects
///////////////////////////////////////////////////////////////////////////
export const authLogin =
  (data, next: Next = () => {}) =>
  (dispatch) => {
    dispatch(requestUserAction());

    return fetchUtils
      .fetchJson(defaultConfig.auth.authUrl, 'POST', data, {})
      .then((response) => {
        const respJson = response.json;
        const respData = respJson && respJson.data;

        if (respJson.status === 'success') {
          try {
            localStorage.setItem(defaultConfig.auth.authKey, JSON.stringify(respData));
          } catch (err) {
            cookies.set(defaultConfig.auth.authKey, JSON.stringify(respData), { path: '/' });
          }

          dispatch(requestUserSuccessAction(respData));
          dispatch(setUserRollsAction((respData && respData.roles) || []));
          dispatch(setUserPermissionsAction((respData && respData.permissions) || []));
          next(null, respData, response);
        } else {
          dispatch(userFailureCustomAction(respJson));
          next(respJson);
        }
      })
      .catch((error) => {
        dispatch(userFailureAction(error));
        next(error);
      });
  };

export const getUserPermissions =
  (params, next: Next = () => {}) =>
  (dispatch) => {
    const user: any = localStorage.getItem(defaultConfig.auth.authKey);
    let permissions;
    if (user) {
      permissions = user.permissions || [];
      dispatch(setUserPermissionsAction(permissions));
    } else {
      permissions = [];
      dispatch(setUserPermissionsAction([]));
    }
    next(permissions);
  };

const clearLocalStorage = () => {
  try {
    localStorage.removeItem(defaultConfig.auth.authKey);
    localStorage.removeItem(defaultConfig.auth.tokenName);
  } catch (err) {
    cookies.erase(defaultConfig.auth.authKey, { path: '/' });
    cookies.erase(defaultConfig.auth.tokenName, { path: '/' });
  }
};

export const authLoginCheck =
  (params, next: Next = () => {}) =>
  (dispatch) => {
    let user;
    try {
      user = localStorage.getItem(defaultConfig.auth.authKey);
    } catch (err) {
      user = cookies.get(defaultConfig.auth.authKey);
    }

    if (user) {
      dispatch(authCheckAction(user));
      next(null, user);
    } else {
      clearLocalStorage();
      dispatch(resetUserAction());
      next({ state: 'error', message: 'app.auth.pleaseLogin' });
    }
  };

export const authLogout =
  (params, next: Next = () => {}) =>
  (dispatch) => {
    clearLocalStorage();
    dispatch(resetUserAction());
    next();
  };

export const extendSession =
  (next: Next = () => {}) =>
  (dispatch) => {
    dispatch(extendSessionAction());

    return fetchUtils
      .fetchJson(defaultConfig.auth.extendSessionUrl)
      .then((response) => {
        dispatch(extendSessionSuccessAction());
        next();
      })
      .catch((error) => {
        dispatch(userFailureAction(error));
        next(error);
      });
  };
