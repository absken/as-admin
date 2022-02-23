import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import * as UiActions from './store/ui.action';

/**
 * Hook for Refresh Side Effect
 *
 * @example
 *
 * const refresh = useRefresh();
 * refresh();
 */
const useRefreshPage = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(UiActions.refreshPageAction());
  }, [dispatch]);
};

export default useRefreshPage;
