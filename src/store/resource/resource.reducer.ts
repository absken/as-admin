import * as ResourceActions from './resource.action';

export type ResourceState = {
  id: number | string;
  isLoading: boolean;
  data: any;
  url: string;
  error: any;
  customError: any;
};

export function resource(config: any) {
  const initialState = {
    id: '',
    isLoading: false,
    data: {},
    url: '',
    error: null,
    customError: null,
  };

  return (state: ResourceState = initialState, action: ResourceActions.ResourceActionTypes) => {
    if (action.name !== config.name) {
      return state;
    }
    switch (action.type) {
      case ResourceActions.RESET_RESOURCE:
        return initialState;
      case ResourceActions.CLEAR_RESOURCE_ERROR:
        return {
          ...state,
          error: null,
          customError: null,
        };
      case ResourceActions.RESOURCE_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload.error,
        };
      case ResourceActions.RESOURCE_FAILURE_CUSTOM:
        return {
          ...state,
          isLoading: false,
          customError: action.payload.error,
        };
      case ResourceActions.REQUEST_RESOURCE:
        return {
          ...state,
          id: action.payload.id,
          url: action.payload.url,
          data: {},
          isLoading: true,
          error: null,
          customError: null,
        };
      case ResourceActions.REQUEST_RESOURCE_SUCCESS:
        return {
          ...state,
          id: action.payload.data && action.payload.data.id,
          data: action.payload.data,
          isLoading: false,
          error: null,
          customError: null,
        };
      case ResourceActions.SAVE_RESOURCE:
        return {
          ...state,
          id: action.payload.id,
          url: action.payload.url || state.url,
          data: {},
          isLoading: true,
        };
      case ResourceActions.DELETE_RESOURCE:
        return {
          ...state,
          id: action.payload.id,
          url: action.payload.url,
          isLoading: true,
          error: null,
          customError: null,
        };
      case ResourceActions.DELETE_RESOURCE_SUCCESS:
        return {
          ...state,
          data: {},
          isLoading: false,
          error: null,
          customError: null,
        };
      default:
        return state;
    }
  };
}
