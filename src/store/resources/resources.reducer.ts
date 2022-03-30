import lodPick from 'lodash/pick';
import lodKeyBy from 'lodash/keyBy';
import lodMap from 'lodash/map';
import lodIsEqual from 'lodash/isEqual';

import * as ResourcesActions from './resources.action';

export type ResourcesState = {
  isLoading: boolean;
  pagination: {
    numPages: number;
    page: number;
    total: number;
  };
  limit: number;
  search: any[];
  filter: any;
  select: string;
  sort: any[];
  url: string;
  data: any;
  ids: string[] | number[];
  urlCsv: string;
  dataCsv: any[];
  error: any;
  customError: any;
};

export function resources(config: any) {
  const { name, limit = 10, search = [], filter = {}, select = '', sort = [] } = config;
  const initialState = {
    isLoading: false,
    pagination: {
      numPages: 0,
      page: 1,
      total: 0,
    },
    limit,
    search,
    filter,
    select,
    sort,
    url: '',
    data: {},
    ids: [],
    urlCsv: '',
    dataCsv: [],
    error: null,
    customError: null,
  };

  return (state: ResourcesState = initialState, action: ResourcesActions.ResourcesActionTypes) => {
    // Only proceed for this resources.
    if (action.name !== name) {
      return state;
    }

    let newRecords;
    let newRecordsById;
    let newIds;
    let newRecordsByIdAcc;
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
      case ResourcesActions.CLEAR_RESOURCES_CSV:
        return {
          ...state,
          dataCsv: [],
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
          ...lodPick(action.payload.params, ['limit', 'select', 'sort', 'search', 'filter']),
          isLoading: true,
          pagination: {
            ...state.pagination,
            page: action.payload.page,
          },
          url: action.payload.url,
          error: null,
          customError: null,
        };
      case ResourcesActions.REQUEST_RESOURCES_SUCCESS:
        newRecords = [...action.payload.data] || [];
        newRecordsById = lodKeyBy(newRecords, 'id');
        newIds = lodMap(newRecords, 'id');

        return {
          ...state,
          isLoading: false,
          pagination: action.payload.pagination,
          data: newRecordsById,
          ids: newIds,
          error: null,
          customError: null,
        };
      case ResourcesActions.REQUEST_RESOURCES_CSV:
        return {
          ...state,
          ...lodPick(action.payload.params, ['sort', 'search', 'filter']),
          isLoading: true,
          urlCsv: action.payload.url,
          error: null,
          customError: null,
        };
      case ResourcesActions.REQUEST_RESOURCES_CSV_SUCCESS:
        newRecords = [...action.payload.data] || [];

        return {
          ...state,
          isLoading: false,
          dataCsv: newRecords,
          error: null,
          customError: null,
        };
      case ResourcesActions.UPDATE_RESOURCES:
        newRecordsByIdAcc = { ...state.data };
        (action.payload.data || []).forEach((record: any) => {
          newRecordsByIdAcc[record.id] = lodIsEqual(record, state.data[record.id])
            ? state.data[record.id]
            : record;
        });
        newIds = [...action.payload.ids];

        return {
          ...state,
          isLoading: false,
          data: newRecordsByIdAcc,
          ids: newIds,
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
        newIdsDel = (state.ids as any[]).filter((el) => !action.payload.ids.includes(el));
        newRecordsDel = Object.entries(state.data)
          .filter(([key]) => !action.payload.ids.includes(key))
          .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {});

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
