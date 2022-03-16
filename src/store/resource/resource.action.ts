import { Dispatch } from 'react';
import lodKeys from 'lodash/keys';
import lodIsEmpty from 'lodash/isEmpty';
import { fetchUtils, undoableDispatch, CoreState } from '@as/ui-react-core';

import { appConfig } from '../../appConfig';
import { selectResource, selectResources } from '../../store';
import {
  accumulateResourcesSuccessAction,
  deleteResourcesSuccessAction,
} from '../resources/resources.action';
import { SideEffectParams } from '../types';

export const RESET_RESOURCE = '[Resource] Reset Entity';
export const CLEAR_RESOURCE_ERROR = '[Resource] Clear Entity Error';
export const RESOURCE_FAILURE = '[Resource] Fetch Entity Failure';
export const RESOURCE_FAILURE_CUSTOM = '[Resource] Fetch Entity Failure Custom';
export const REQUEST_RESOURCE = '[Resource] Request Entity';
export const REQUEST_RESOURCE_SUCCESS = '[Resource] Request Entity Success';
export const SAVE_RESOURCE = '[Resource] Save Entity';
export const DELETE_RESOURCE = '[Resource] Delete Entity';
export const DELETE_RESOURCE_SUCCESS = '[Resource] Delete Entity Success';

export interface ResetResourceAction {
  readonly type: typeof RESET_RESOURCE;
  readonly name: string;
}

export interface ClearResourceErrorAction {
  readonly type: typeof CLEAR_RESOURCE_ERROR;
  readonly name: string;
}

export interface ResourceFailureAction {
  readonly type: typeof RESOURCE_FAILURE;
  readonly name: string;
  readonly payload: any;
  readonly meta: any;
}

export interface ResourceFailureCustomAction {
  readonly type: typeof RESOURCE_FAILURE_CUSTOM;
  readonly name: string;
  readonly payload: any;
  readonly meta: any;
}

export interface RequestResourceAction {
  readonly type: typeof REQUEST_RESOURCE;
  readonly name: string;
  readonly payload: any;
}

export interface RequestResourceSuccessAction {
  readonly type: typeof REQUEST_RESOURCE_SUCCESS;
  readonly name: string;
  readonly payload: any;
}

export interface SaveResourceAction {
  readonly type: typeof SAVE_RESOURCE;
  readonly name: string;
  readonly payload: any;
}

export interface DeleteResourceAction {
  readonly type: typeof DELETE_RESOURCE;
  readonly name: string;
  readonly payload: any;
}

export interface DeleteResourceSuccessAction {
  readonly type: typeof DELETE_RESOURCE_SUCCESS;
  readonly name: string;
  readonly payload: any;
}

export type ResourceActionTypes =
  | ResetResourceAction
  | ClearResourceErrorAction
  | ResourceFailureAction
  | ResourceFailureCustomAction
  | RequestResourceAction
  | RequestResourceSuccessAction
  | SaveResourceAction
  | DeleteResourceAction
  | DeleteResourceSuccessAction;

export const resetResourceAction = (name: string) => ({
  type: RESET_RESOURCE,
  name,
});

export const clearResourceErrorAction = (name: string) => ({
  type: CLEAR_RESOURCE_ERROR,
  name,
});

export const resourceFailureAction = (name: string, error: any) => ({
  type: RESOURCE_FAILURE,
  name,
  payload: { error },
  meta: { error },
});

export const resourceFailureCustomAction = (name: string, error: any) => ({
  type: RESOURCE_FAILURE_CUSTOM,
  name,
  payload: { error },
  meta: { error },
});

export const requestResourceAction = (name: string, id: string | number, url: string) => ({
  type: REQUEST_RESOURCE,
  name,
  payload: { id, url },
});

export const requestResourceSuccessAction = (name: string, id: string | number, data: any) => ({
  type: REQUEST_RESOURCE_SUCCESS,
  name,
  payload: { id, data },
});

export const saveResourceAction = (name: string, data: any) => ({
  type: SAVE_RESOURCE,
  name,
  payload: { data },
});

export const deleteResourceAction = (name: string, id: string | number, url: string) => ({
  type: DELETE_RESOURCE,
  name,
  payload: { id, url },
});

export const deleteResourceSuccessAction = (name: string, id: string | number) => ({
  type: DELETE_RESOURCE_SUCCESS,
  name,
  payload: { id },
});

//-------------------------------------------------------------------------
// Side effects
//-------------------------------------------------------------------------
export const requestResource =
  (name: string, payload: any = {}, params: SideEffectParams = { next: () => {} }) =>
  (dispatch: Dispatch<any>, getState: () => CoreState) => {
    // Check to see if the record is already loaded.
    // const previousRecord = selectResource(name, getState());
    // if (previousRecords.id === id) {
    //   return;
    // }
    const { query = {}, fetchOptions = {}, next } = params;
    const url = `${appConfig.app.projectUrl}/${name}/${payload.id}`;

    dispatch(requestResourceAction(name, payload.id, url));

    return fetchUtils
      .fetchJson(url, 'GET', null, { query, fetchOptions })
      .then((response) => {
        const respJson = response.json;
        const respData = respJson && respJson.data;

        if (respJson.status === 'success') {
          const keys = lodKeys(respData);
          const peeledData = respData[keys[0]];

          dispatch(requestResourceSuccessAction(name, payload.id, peeledData));

          // sync resources state
          const resourcesState = selectResources(name, getState());
          if (resourcesState && resourcesState.data) {
            const matchedRecord = resourcesState.data[payload.id];
            if (matchedRecord) {
              accumulateResourcesSuccessAction(name, [matchedRecord]);
            }
          }

          next(null, peeledData, response);
        } else {
          dispatch(resourceFailureCustomAction(name, respJson));
          next(respJson);
        }
      })
      .catch((error) => {
        dispatch(resourceFailureAction(name, error));
        next(error);
      });
  };

export const deleteResource = (
  name: string,
  payload: any = {},
  params: SideEffectParams = { next: () => {} }
) => {
  // eslint-disable-next-line consistent-return
  return (dispatch: Dispatch<any>, getState: () => CoreState) => {
    const { undoable = true } = params;
    const url = `${appConfig.app.projectUrl}/${name}/${payload.id}`;
    const resourcesState = selectResources(name, getState());
    const previousRecords: any[] = [];

    if (resourcesState.data[payload.id]) {
      previousRecords.push(resourcesState.data[payload.id]);
    }

    const resourceState = selectResource(name, getState());
    let previousRecord = {};
    if (resourceState && resourceState.id) {
      previousRecord = { ...resourceState.data };
    }

    const performFetchDeleteResource = fetchDeleteResource(
      name,
      payload,
      params,
      url,
      dispatch,
      getState
    );

    if (!undoable) {
      dispatch(deleteResourceAction(name, payload.id, url));
      return performFetchDeleteResource();
    }

    undoableDispatch({
      dispatch,
      immediateDispatch: () => {
        dispatch(deleteResourceAction(name, payload.id, url));
        // sync resources state
        const selectedResourcesState = selectResources(name, getState());
        if (selectedResourcesState.ids.includes(payload.id)) {
          dispatch(deleteResourcesSuccessAction(name, [payload.id]));
        }
      },
      undoDispatch: () => {
        dispatch(
          requestResourceSuccessAction(name, resourceState && resourceState.id, previousRecord)
        );
        // sync resources state
        if (previousRecords && !lodIsEmpty(previousRecords)) {
          dispatch(accumulateResourcesSuccessAction(name, previousRecords));
        }
      },
      delayedDispatch: () => {
        return performFetchDeleteResource();
      },
    });
  };
};

const fetchDeleteResource =
  (
    name: string,
    payload: any,
    params: SideEffectParams = { next: () => {} },
    url: string,
    dispatch: Dispatch<any>,
    getState: () => CoreState
  ) =>
  () => {
    const { query = {}, fetchOptions = {}, next } = params;

    return fetchUtils
      .fetchJson(url, 'DELETE', null, { query, fetchOptions })
      .then((response) => {
        const respJson = response.json;

        if (respJson.status === 'success') {
          dispatch(deleteResourceSuccessAction(name, payload.id));

          // sync resources state
          const resourcesState = selectResources(name, getState());
          if (resourcesState.ids.includes(payload.id)) {
            dispatch(deleteResourcesSuccessAction(name, [payload.id]));
          }

          next(null, respJson, response);
        } else {
          dispatch(resourceFailureCustomAction(name, respJson));
          next(respJson);
        }
      })
      .catch((error) => {
        dispatch(resourceFailureAction(name, error));
        next(error);
      });
  };
