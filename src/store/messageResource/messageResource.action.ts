import { Dispatch } from 'react';
import lodKeys from 'lodash/keys';
import { fetchUtils } from '@as/ui-react-core';

import { appConfig } from '../../appConfig';
import { SideEffectParams } from '../types';

export const RESET_MESSAGE_RESOURCE = '[Message Resource] Reset Message Resource';
export const MESSAGE_RESOURCE_FAILURE = '[Message Resource] Request Message Resource Failure';
export const MESSAGE_RESOURCE_FAILURE_CUSTOM = '[Lookup] Request Message Resource Failure Custom';
export const REQUEST_MESSAGE_RESOURCE = '[Message Resource] Request Message Resource';
export const REQUEST_MESSAGE_RESOURCE_SUCCESS =
  '[Message Resource] Request Message Resource Success';
export const SAVE_MESSAGE_RESOURCE = '[Lookup] Save Lookup';

export interface ResetMessageResourceAction {
  readonly type: typeof RESET_MESSAGE_RESOURCE;
  readonly payload: any;
}

export interface MessageResourceFailureAction {
  readonly type: typeof MESSAGE_RESOURCE_FAILURE;
  readonly payload: any;
  readonly meta: any;
}

export interface MessageResourceFailureCustomAction {
  readonly type: typeof MESSAGE_RESOURCE_FAILURE_CUSTOM;
  readonly payload: any;
}

export interface RequestMessageResourceAction {
  readonly type: typeof REQUEST_MESSAGE_RESOURCE;
  readonly payload: any;
}

export interface RequestMessageResourceSuccessAction {
  readonly type: typeof REQUEST_MESSAGE_RESOURCE_SUCCESS;
  readonly payload: any;
}

export type MessageResourceActionTypes =
  | ResetMessageResourceAction
  | MessageResourceFailureAction
  | MessageResourceFailureCustomAction
  | RequestMessageResourceAction
  | RequestMessageResourceSuccessAction;

export const resetMessageResourceAction = (namespaces: string[]) => ({
  type: RESET_MESSAGE_RESOURCE,
  payload: { namespaces },
});

export const messageResourceFailureAction = (error: any) => ({
  type: MESSAGE_RESOURCE_FAILURE,
  payload: { error },
  meta: { error },
});

export const messageResourceFailureCustomAction = (error: any) => ({
  type: MESSAGE_RESOURCE_FAILURE_CUSTOM,
  payload: { error },
});

export const requestMessageResourceAction = (namespaces: string[]) => ({
  type: REQUEST_MESSAGE_RESOURCE,
  payload: { namespaces },
});

export const requestMessageResourceSuccessAction = (
  namespaces: string[],
  messageResource: object
) => ({
  type: REQUEST_MESSAGE_RESOURCE_SUCCESS,
  payload: { namespaces, messageResource },
});

// const saveMessageResourceAction = (data) => ({
//   type: SAVE_MESSAGE_RESOURCE,
//   payload: { data },
// });

//------------------------------------------------------------------------
// Side effects
//------------------------------------------------------------------------
export const getMessageResource =
  (namespaces: string[], params: SideEffectParams = { next: () => {} }) =>
  (dispatch: Dispatch<any>) => {
    const { query = {}, fetchOptions = {}, next } = params;
    const url = `${appConfig.app.projectUrl}/messageResource?namespaces=${namespaces.join(',')}`;

    dispatch(requestMessageResourceAction(namespaces));

    return fetchUtils
      .fetchJson(url, 'GET', null, { query, fetchOptions })
      .then((response) => {
        const respJson = response.json;
        const respData = respJson && respJson.data;

        if (respJson.status === 'success') {
          const keys = lodKeys(respData);
          const peeledData = respData[keys[0]];

          dispatch(requestMessageResourceSuccessAction(namespaces, peeledData));
          next(null, peeledData, response);
        } else {
          dispatch(messageResourceFailureCustomAction(respJson));
          next(respJson);
        }
      })
      .catch((error) => {
        dispatch(messageResourceFailureAction(error));
        next(error);
      });
  };
