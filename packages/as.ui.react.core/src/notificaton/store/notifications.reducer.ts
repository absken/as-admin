import * as NotificationsActions from './notifications.action';

export type NotificationState = any[];

const initialState: NotificationState = [];

const notificationsReducer = (
  state: NotificationState = initialState,
  action: NotificationsActions.NotificationsActionTypes
) => {
  switch (action.type) {
    case NotificationsActions.SHOW_NOTIFICATION:
      const newNotificationOptions = {
        ...action.payload.notificationOptions,
        type: action.payload.type,
        message: action.payload.message,
      };
      return state.concat(newNotificationOptions);

    case NotificationsActions.HIDE_NOTIFICATION:
    case NotificationsActions.UNDO:
      return state.slice(1);

    default:
      return state;
  }
};

export default notificationsReducer;
