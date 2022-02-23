import { Dispatch } from 'react';

export const SHOW_CONFIRM = '[Core/Confirm] Show Confirm';
export const HIDE_CONFIRM = '[Core/Confirm] Hide Confirm';

export interface ShowConfirmAction {
  readonly type: typeof SHOW_CONFIRM;
  readonly payload: any;
}

export interface HideConfirmAction {
  readonly type: typeof HIDE_CONFIRM;
}

export type ConfirmActionTypes = ShowConfirmAction | HideConfirmAction;

export const showConfirmAction = (title: string, content: any, confirmOptions: object) => ({
  type: SHOW_CONFIRM,
  payload: { title, content, confirmOptions },
});

export const hideConfirmAction = () => ({
  type: HIDE_CONFIRM,
});

///////////////////////////////////////////////////////////////////////////
// Side effects
///////////////////////////////////////////////////////////////////////////
export const showConfirm =
  (title: string, content: any, confirmOptions: any = {}, next?: () => any) =>
  (dispatch: Dispatch<any>) => {
    dispatch(showConfirmAction(title, content, confirmOptions));
    if (next) next();
  };

export const hideConfirm = (next?: () => any) => (dispatch: Dispatch<any>) => {
  dispatch(hideConfirmAction());
  if (next) next();
};
