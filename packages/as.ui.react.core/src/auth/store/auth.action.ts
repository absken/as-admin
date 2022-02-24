import { Dispatch } from 'react';
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

export interface ResetUserAction {
  readonly type: typeof RESET_USER;
}

export interface ClearUserErrorAction {
  readonly type: typeof CLEAR_USER_ERROR;
}

export interface UserFailureAction {
  readonly type: typeof USER_FAILURE;
  readonly payload: any;
  readonly meta: any;
}

export interface UserFailureCustomAction {
  readonly type: typeof USER_FAILURE_CUSTOM;
  readonly payload: any;
}

export interface RequestUserAction {
  readonly type: typeof REQUEST_USER;
}

export interface RequestUserSuccessAction {
  readonly type: typeof REQUEST_USER_SUCCESS;
  readonly payload: any;
}

export interface SetUserRollsAction {
  readonly type: typeof SET_USER_ROLLS;
  readonly payload: any;
}

export interface SetUserPermissionsAction {
  readonly type: typeof SET_USER_PERMISSIONS;
  readonly payload: any;
}

export interface AuthCheckAction {
  readonly type: typeof AUTH_CHECK;
  readonly payload: any;
}

export interface ExtendSessionAction {
  readonly type: typeof EXTEND_SESSION;
}

export interface ExtendSessionSuccessAction {
  readonly type: typeof EXTEND_SESSION_SUCCESS;
}

export type AuthActionTypes =
  | ResetUserAction
  | ClearUserErrorAction
  | UserFailureAction
  | UserFailureCustomAction
  | RequestUserAction
  | RequestUserSuccessAction
  | SetUserRollsAction
  | SetUserPermissionsAction
  | AuthCheckAction
  | ExtendSessionAction
  | ExtendSessionSuccessAction;

export const resetUserAction = () => ({
  type: RESET_USER,
});

export const clearUserErrorAction = (name: string) => ({
  type: CLEAR_USER_ERROR,
});

// use meta to handle an error globally
export const userFailureAction = (error: any) => ({
  type: USER_FAILURE,
  payload: { error },
  meta: { error },
});

export const userFailureCustomAction = (error: any) => ({
  type: USER_FAILURE_CUSTOM,
  payload: { error },
});

export const requestUserAction = () => ({
  type: REQUEST_USER,
});

export const requestUserSuccessAction = (user: any) => ({
  type: REQUEST_USER_SUCCESS,
  payload: { user },
});

export const setUserRollsAction = (roles: any) => ({
  type: SET_USER_ROLLS,
  payload: { roles },
});

export const setUserPermissionsAction = (permissions: any) => ({
  type: SET_USER_PERMISSIONS,
  payload: { permissions },
});

export const authCheckAction = (user: any) => ({
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
  (data: any, next: Next = () => {}) =>
  (dispatch: Dispatch<any>) => {
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
  (params: any, next: Next = () => {}) =>
  (dispatch: Dispatch<any>) => {
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
  (params: any, next: Next = () => {}) =>
  (dispatch: Dispatch<any>) => {
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
  (params: any, next: Next = () => {}) =>
  (dispatch: Dispatch<any>) => {
    clearLocalStorage();
    dispatch(resetUserAction());
    next();
  };

export const extendSession =
  (next: Next = () => {}) =>
  (dispatch: Dispatch<any>) => {
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
