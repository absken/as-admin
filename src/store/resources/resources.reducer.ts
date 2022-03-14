import lodPick from 'lodash/pick';
import lodKeyBy from 'lodash/keyBy';
import lodMap from 'lodash/map';
import lodIsEqual from 'lodash/isEqual';
import lodKeys from 'lodash/keys';

import * as ResourcesActions from './resources.action';

export type ResourcesState = {
  isLoading: boolean;
  pagination: {
    numPages: number;
    page: number;
    total: number;
  };
  limit: number;
  filter: any;
  select: string;
  sort: string;
  url: string;
  data: any;
  ids: string[] | number[];
  error: any;
  customError: any;
};

export function resources(config: any) {
  const { name, limit = 10, filter = {}, select = '', sort = '' } = config;
  const initialState = {
    isLoading: false,
    pagination: {
      numPages: 0,
      page: 1,
      total: 0,
    },
    limit,
    filter,
    select,
    sort,
    url: '',
    data: {},
    ids: [],
    error: null,
    customError: null,
  };

  return (state: ResourcesState = initialState, action: ResourcesActions.ResourcesActionTypes) => {
    // Only proceed for this resources.
    if (action.name !== name) {
      return state;
    }

    let total;
    let newRecordsById;
    let newIds;
    let newRecordsByIdAcc;
    let newIdsAcc;
    let newRecordsDel;
    let newIdsDel;

    switch (action.type) {
      case ResourcesActions.RESET_RESOURCES:
        return initialState;
      case ResourcesActions.CLEAR_RESOURCES_ERROR:
        return {
          ...state,
          error: null,
          customError: null,
        };
      case ResourcesActions.RESOURCES_FAILURE:
        return {
          ...state,
          error: action.payload.error,
          isLoading: false,
        };
      case ResourcesActions.RESOURCES_FAILURE_CUSTOM:
        return {
          ...state,
          customError: action.payload.error,
          isLoading: false,
        };
      case ResourcesActions.REQUEST_RESOURCES:
        return {
          ...state,
          ...lodPick(action.payload.params, ['limit', 'filter', 'select', 'sort']),
          isLoading: true,
          pagination: {
            ...state.pagination,
            page: action.payload.page,
          },
          url: action.payload.url,
          data: {},
          ids: [],
          error: null,
          customError: null,
        };
      case ResourcesActions.REQUEST_RESOURCES_SUCCESS:
        total = action.payload.data.serverCount;
        newRecordsById = lodKeyBy(action.payload.data || [], 'id');
        newIds = lodMap(action.payload.data || [], 'id');

        return {
          ...state,
          isLoading: false,
          pagination: {
            ...state.pagination,
            numPages: Math.ceil(total / state.limit),
            total,
          },
          data: newRecordsById,
          ids: newIds,
          error: null,
          customError: null,
        };
      case ResourcesActions.ACCUMULATE_RESOURCES:
        return {
          ...state,
          ...lodPick(action.payload.params, ['limit', 'filter', 'select', 'sort']),
          isLoading: true,
          pagination: {
            ...state.pagination,
            page: action.payload.page,
          },
          url: action.payload.url,
          error: null,
          customError: null,
        };
      case ResourcesActions.ACCUMULATE_RESOURCES_SUCCESS:
        newRecordsByIdAcc = { ...state.data };
        (action.payload.data || []).forEach((record: any) => {
          newRecordsByIdAcc[record.id] = lodIsEqual(record, state.data[record.id])
            ? state.data[record.id]
            : record;
        });
        newIdsAcc = lodKeys(newRecordsByIdAcc);

        return {
          ...state,
          isLoading: false,
          data: newRecordsByIdAcc,
          ids: newIdsAcc,
          error: null,
          customError: null,
        };
      case ResourcesActions.DELETE_RESOURCES:
        return {
          ...state,
          url: action.payload.url,
          isLoading: true,
          error: null,
          customError: null,
        };
      case ResourcesActions.DELETE_RESOURCES_SUCCESS:
        newRecordsDel = Object.entries(state.data)
          .filter(([key]) => !action.payload.ids.includes(key))
          .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {});
        newIdsDel = lodKeys(newRecordsDel);

        return {
          ...state,
          isLoading: false,
          data: newRecordsDel,
          ids: newIdsDel,
          error: null,
          customError: null,
        };
      default:
        return state;
    }
  };
}
