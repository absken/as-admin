import * as MessageResourceActions from './messageResource.action';

export type MessageResourceState = {
  namespaceApp: string;
  namespaces: string[];
  isLoading: boolean;
  data: any;
  dataApp: any;
  error: any;
  customError: any;
};

const initialState = {
  namespaceApp: 'app',
  namespaces: [],
  isLoading: false,
  data: {},
  dataApp: {},
  error: null,
  customError: null,
};

export const messageResource =
  (config: any) =>
  (
    state: MessageResourceState = initialState,
    action: MessageResourceActions.MessageResourceActionTypes
  ) => {
    const { type, payload } = action;

    let messageResourceKey = 'data';
    if (payload && payload.namespaces && payload.namespaces.includes(initialState.namespaceApp)) {
      messageResourceKey = 'dataApp';
    }

    switch (type) {
      case MessageResourceActions.RESET_MESSAGE_RESOURCE:
        return initialState;

      case MessageResourceActions.MESSAGE_RESOURCE_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: payload.error,
        };

      case MessageResourceActions.MESSAGE_RESOURCE_FAILURE_CUSTOM:
        return {
          ...state,
          isLoading: false,
          customError: payload.error,
        };

      case MessageResourceActions.REQUEST_MESSAGE_RESOURCE:
        return {
          ...state,
          namespaces: [...payload.namespaces],
          [messageResourceKey]: {},
          isLoading: true,
          error: null,
          customError: null,
        };

      case MessageResourceActions.REQUEST_MESSAGE_RESOURCE_SUCCESS:
        return {
          ...state,
          namespaces: [...payload.namespaces],
          [messageResourceKey]: payload.messageResource,
          isLoading: false,
          error: null,
          customError: null,
        };

      default:
        return state;
    }
  };
