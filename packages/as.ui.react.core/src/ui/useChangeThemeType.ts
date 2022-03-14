import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import * as UiActions from './store/ui.action';

/**
 * Hook for Setting theme type
 *
 * @example
 *
 * const setThemeType = useSetThemeType();
 * setThemeType('dark');
 */
const useSetThemeType = () => {
  const dispatch = useDispatch();

  return useCallback(
    (themeType: string) => {
      dispatch(UiActions.setThemeTypeAction(themeType));
    },
    [dispatch]
  );
};

export default useSetThemeType;
