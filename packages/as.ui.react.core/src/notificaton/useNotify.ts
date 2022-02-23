import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import * as NotificationsActions from './store/notifications.action';

/**
 * Hook for Notification Side Effect
 *
 * @example
 *
 * const notify = useNotify();
 * // simple message (info level)
 * notify('Level complete');
 * // specify level
 * notify('A problem occurred', 'warning')
 * // complex
 * notify('A problem occurred (%{count})', 'warning', { messageArgs: { count: 2 }, undoable: true, autoHideDuration: 5, multiLine: true })
 */

const useNotify = () => {
  const dispatch = useDispatch();
  return useCallback(
    (message, type, notificationOptions = {}) => {
      dispatch(NotificationsActions.showNotification(message, type || 'info', notificationOptions));
    },
    [dispatch]
  );
};

export default useNotify;
