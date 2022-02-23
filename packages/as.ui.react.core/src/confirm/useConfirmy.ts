import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import * as ConfirmActions from './store/confirm.action';

/**
 * Hook for Confirm Side Effect
 *
 * @example
 *
 * const confirmy = useConfirmy();
 * confirmy('A problem occurred (%{count})', 'warning', { messageArgs: { count: 2 }, undoable: true, autoHideDuration: 5, multiLine: true })
 */

const useConfirmy = () => {
  const dispatch = useDispatch();
  return useCallback(
    (message, type, notificationOptions = {}) => {
      dispatch(ConfirmActions.showConfirm(message, type || 'info', notificationOptions));
    },
    [dispatch]
  );
};

export default useConfirmy;
