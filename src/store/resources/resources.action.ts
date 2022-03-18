import { Dispatch } from 'react';
import lodKeys from 'lodash/keys';
import lodIsEmpty from 'lodash/isEmpty';
import { CoreState, fetchUtils, undoableDispatch } from '@as/ui-react-core';

import { appConfig } from '../../appConfig';
import { selectResource, selectResources } from '../../store';
import {
  requestResourceSuccessAction,
  deleteResourceSuccessAction,
} from '../resource/resource.action';
import { SideEffectParams } from '../types';

export const RESET_RESOURCES = '[Resources] Reset Entities';
export const CLEAR_RESOURCES_ERROR = '[Resources] Clear Entities Error';
export const RESOURCES_FAILURE = '[Resources] Fetch Entities Failure';
export const RESOURCES_FAILURE_CUSTOM = '[Resources] Fetch Entities Failure Custom';
export const REQUEST_RESOURCES = '[Resources] Request Entities';
export const REQUEST_RESOURCES_SUCCESS = '[Resources] Request Entities Success';
export const ACCUMULATE_RESOURCES = '[Resources] Accumulate Entities';
export const ACCUMULATE_RESOURCES_SUCCESS = '[Resources] Accumulate Entities Success';
export const DELETE_RESOURCES = '[Resources] Delete Entities';
export const DELETE_RESOURCES_SUCCESS = '[Resources] Delete Entities Success';

export interface ResetResourcesAction {
  readonly type: typeof RESET_RESOURCES;
  readonly name: string;
}

export interface ClearResourcesErrorAction {
  readonly type: typeof CLEAR_RESOURCES_ERROR;
  readonly name: string;
}

export interface ResourcesFailureAction {
  readonly type: typeof RESOURCES_FAILURE;
  readonly name: string;
  readonly payload: any;
  readonly meta: any;
}

export interface ResourcesFailureCustomAction {
  readonly type: typeof RESOURCES_FAILURE_CUSTOM;
  readonly name: string;
  readonly payload: any;
  readonly meta: any;
}

export interface RequestResourcesAction {
  readonly type: typeof REQUEST_RESOURCES;
  readonly name: string;
  readonly payload: any;
}

export interface RequestResourcesSuccessAction {
  readonly type: typeof REQUEST_RESOURCES_SUCCESS;
  readonly name: string;
  readonly payload: any;
}

export interface AccumulateResourcesAction {
  readonly type: typeof ACCUMULATE_RESOURCES;
  readonly name: string;
  readonly payload: any;
}

export interface AccumulateResourcesSuccessAction {
  readonly type: typeof ACCUMULATE_RESOURCES_SUCCESS;
  readonly name: string;
  readonly payload: any;
}

export interface DeleteResourcesAction {
  readonly type: typeof DELETE_RESOURCES;
  readonly name: string;
  readonly payload: any;
}

export interface DeleteResourcesSuccessAction {
  readonly type: typeof DELETE_RESOURCES_SUCCESS;
  readonly name: string;
  readonly payload: any;
}

export type ResourcesActionTypes =
  | ResetResourcesAction
  | ClearResourcesErrorAction
  | ResourcesFailureAction
  | ResourcesFailureCustomAction
  | RequestResourcesAction
  | RequestResourcesSuccessAction
  | AccumulateResourcesAction
  | AccumulateResourcesSuccessAction
  | DeleteResourcesAction
  | DeleteResourcesSuccessAction;

export const resetResourcesAction = (name: string) => ({
  type: RESET_RESOURCES,
  name,
});

export const clearResourcesErrorAction = (name: string) => ({
  type: CLEAR_RESOURCES_ERROR,
  name,
});

export const resourcesFailureAction = (name: string, error: any) => ({
  type: RESOURCES_FAILURE,
  name,
  payload: { error },
  meta: { error },
});

export const resourcesFailureCustomAction = (name: string, error: any) => ({
  type: RESOURCES_FAILURE_CUSTOM,
  name,
  payload: { error },
  meta: { error },
});

export const requestResourcesAction = (name: string, page: number, url: string, params: any) => ({
  type: REQUEST_RESOURCES,
  name,
  payload: { page, url, params },
});

export const requestResourcesSuccessAction = (name: string, data: any, pagination: any) => ({
  type: REQUEST_RESOURCES_SUCCESS,
  name,
  payload: { data, pagination },
});

export const accumulateResourcesAction = (
  name: string,
  page: number,
  url: string,
  params: any
) => ({
  type: ACCUMULATE_RESOURCES,
  name,
  payload: { page, url, params },
});

export const accumulateResourcesSuccessAction = (name: string, data: any) => ({
  type: ACCUMULATE_RESOURCES_SUCCESS,
  name,
  payload: { data },
});

export const deleteResourcesAction = (name: string, ids: string[] | number[], url: string) => ({
  type: DELETE_RESOURCES,
  name,
  payload: { ids, url },
});

export const deleteResourcesSuccessAction = (name: string, ids: string[] | number[]) => ({
  type: DELETE_RESOURCES_SUCCESS,
  name,
  payload: { ids },
});

//-------------------------------------------------------------------------
// Side effects
//-------------------------------------------------------------------------
export const getResources =
  (name: string, payload: any = {}, params: SideEffectParams = { next: () => {} }) =>
  (dispatch: Dispatch<any>, getState: () => CoreState) => {
    const {
      page = 1,
      limit,
      filter,
      select,
      sort,
      accumulate = false,
      fetchOptions = {},
      next,
    } = params;
    const url = `${appConfig.app.projectUrl}/${name}`;
    const {
      limit: sLimit,
      filter: sFilter,
      select: sSelect,
      sort: sSort,
    } = selectResources(name, getState());

    const finalLimit = limit || sLimit;
    const finalSelect = select || sSelect;
    const finalSort = sort || sSort;
    const requestParams = { ...filter, ...sFilter };

    if (page) {
      requestParams.page = page;
    } else {
      delete requestParams.page;
    }

    if (limit) {
      requestParams.limit = finalLimit;
    } else {
      delete requestParams.limit;
    }

    if (select) {
      requestParams.select = finalSelect;
    } else {
      delete requestParams.select;
    }

    if (sort) {
      requestParams.sort = finalSort;
    } else {
      delete requestParams.sort;
    }

    if (accumulate) {
      dispatch(accumulateResourcesAction(name, page, url, requestParams));
    } else {
      dispatch(requestResourcesAction(name, page, url, requestParams));
    }

    return fetchUtils
      .fetchJson(url, 'GET', payload, { query: requestParams, fetchOptions })
      .then((response) => {
        const respJson = response.json;
        const respData = respJson && respJson.data;

        if (respJson.status === 'success') {
          const keys = lodKeys(respData);
          const peeledData = respData[keys[0]];
          const pagination = {
            numPages: respData.zPages,
            page: respData.zPage,
            total: respData.zCount,
          };

          if (accumulate) {
            dispatch(accumulateResourcesSuccessAction(name, peeledData));
          } else {
            dispatch(requestResourcesSuccessAction(name, peeledData, pagination));
          }

          // sync resource state
          const resourceState = selectResource(name, getState());
          const resourcesState = selectResources(name, getState());
          if (resourceState && resourceState.id) {
            const matchedRecord = resourcesState.data[resourceState.id];
            if (matchedRecord) {
              requestResourceSuccessAction(name, resourceState.id, matchedRecord);
            }
          }

          next(null, peeledData, response);
        } else {
          dispatch(resourcesFailureCustomAction(name, respJson));
          next(respJson);
        }
      })
      .catch((error) => {
        dispatch(resourcesFailureAction(name, error));
        next(error);
      });
  };

export const deleteResources = (name: string, payload: any = {}, params: any = {}) => {
  // eslint-disable-next-line consistent-return
  return (dispatch: Dispatch<any>, getState: () => CoreState) => {
    const { undoable = true } = params;
    const url = `${appConfig.app.projectUrl}/${name}/delete?ids=${payload.ids.join(',')}`;
    const resourcesState = selectResources(name, getState());
    const previousRecords: any[] = [];
    payload.ids.forEach((id: string | number) => previousRecords.push(resourcesState.data[id]));

    const resourceState = selectResource(name, getState());
    let previousRecord = {};
    if (resourceState && resourceState.id) {
      if (payload.ids.includes(resourceState.id)) {
        previousRecord = { ...resourceState.data };
      }
    }

    const performFetchDeleteResources = fetchDeleteResources(
      name,
      payload,
      params,
      url,
      dispatch,
      getState
    );

    if (!undoable) {
      dispatch(deleteResourcesAction(name, payload.ids, url));
      return performFetchDeleteResources();
    }

    undoableDispatch({
      dispatch,
      immediateDispatch: () => {
        dispatch(deleteResourcesSuccessAction(name, payload.ids));
        // sync resource state
        const selectedResourcesState = selectResource(name, getState());
        if (selectedResourcesState && selectedResourcesState.id) {
          if (payload.ids.includes(resourceState.id)) {
            dispatch(deleteResourceSuccessAction(name, resourceState.id));
          }
        }
      },
      undoDispatch: () => {
        dispatch(accumulateResourcesSuccessAction(name, previousRecords));
        // sync resource state
        if (previousRecord && !lodIsEmpty(previousRecord)) {
          dispatch(
            requestResourceSuccessAction(name, resourceState && resourceState.id, previousRecord)
          );
        }
      },
      delayedDispatch: () => {
        return performFetchDeleteResources();
      },
    });
  };
};

const fetchDeleteResources =
  (
    name: string,
    payload: any,
    params: any,
    url: string,
    dispatch: Dispatch<any>,
    getState: () => CoreState
  ) =>
  () => {
    const { query = {}, fetchOptions = {}, next = () => {} } = params;

    return fetchUtils
      .fetchJson(url, 'DELETE', null, { query, fetchOptions })
      .then((response) => {
        const respJson = response.json;

        if (respJson.status === 'success') {
          dispatch(deleteResourcesSuccessAction(name, payload.ids));

          // sync resource state
          const resourceState = selectResource(name, getState());
          if (resourceState && resourceState.id) {
            if (payload.ids.includes(resourceState.id)) {
              dispatch(deleteResourceSuccessAction(name, resourceState.id));
            }
          }

          next(null, respJson, response);
        } else {
          dispatch(resourcesFailureCustomAction(name, respJson));
          next(respJson);
        }
      })
      .catch((error) => {
        dispatch(resourcesFailureAction(name, error));
        next(error);
      });
  };
