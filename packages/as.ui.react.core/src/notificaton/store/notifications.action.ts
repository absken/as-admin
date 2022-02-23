import { Dispatch } from 'react';

export const SHOW_NOTIFICATION = '[Core/Notifications] Show Notification';
export const HIDE_NOTIFICATION = '[Core/Notifications] Hide Notification';
export const UNDO = '[Core] Undo';
export const COMPLETE = '[Core] Complete';

export interface ShowNotificationAction {
  readonly type: typeof SHOW_NOTIFICATION;
  readonly payload: any;
}

export interface HideNotificationAction {
  readonly type: typeof HIDE_NOTIFICATION;
}

export interface UndoAction {
  readonly type: typeof UNDO;
}

export interface CompleteAction {
  readonly type: typeof COMPLETE;
}

export type NotificationsActionTypes =
  | ShowNotificationAction
  | HideNotificationAction
  | UndoAction
  | CompleteAction;

export const showNotificationAction = (
  message: string,
  type: string,
  notificationOptions?: object
) => ({
  type: SHOW_NOTIFICATION,
  payload: { message, type, notificationOptions },
});

export const hideNotificationAction = () => ({
  type: HIDE_NOTIFICATION,
});

export const undoAction = () => ({
  type: UNDO,
});

export const completeAction = () => ({
  type: COMPLETE,
});

///////////////////////////////////////////////////////////////////////////
// Side effects
///////////////////////////////////////////////////////////////////////////
export const showNotification =
  (message: string, type = 'info', notificationOptions?: object, next?: () => any) =>
  (dispatch: Dispatch<any>) => {
    dispatch(showNotificationAction(message, type, notificationOptions));
    if (next) next();
  };

export const hideNotification = (next?: () => any) => (dispatch: Dispatch<any>) => {
  dispatch(hideNotificationAction());
  if (next) next();
};
