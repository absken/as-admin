import * as ConfirmActions from './confirm.action';

export type ConfirmState = {
  [key: string]: any;
};

const initialState: ConfirmState = {};

const confirmReducer = (
  state: ConfirmState = initialState,
  action: ConfirmActions.ConfirmActionTypes
) => {
  let newConfirmOptions;
  switch (action.type) {
    case ConfirmActions.SHOW_CONFIRM:
      newConfirmOptions = {
        ...action.payload.confirmOptions,
        title: action.payload.title,
        content: action.payload.content,
      };
      return newConfirmOptions;

    case ConfirmActions.HIDE_CONFIRM:
      return {};

    default:
      return state;
  }
};

export default confirmReducer;
