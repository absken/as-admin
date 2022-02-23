import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import * as LoadingActions from './store/loading.action';

/**
 * Update the loading count, which starts or stops the loading indicator.
 *
 * @example
 * import { useUpdateLoading } from 'app-name'
 *
 * const MyComponent = () => {
 *      const { startLoading, stopLoading } = useUpdateAppLoading();
 *      useEffect(() => {
 *          startLoading();
 *          fetch('http://my.domain.api/foo')
 *              .finally(() => stopLoading());
 *      }, []);
 *      return <span>Foo</span>;
 * }
 */
const useUpdateAppLoading = () => {
  const dispatch = useDispatch();

  const startLoading = useCallback(() => {
    dispatch(LoadingActions.startAppLoadingAction());
  }, [dispatch]);

  const stopLoading = useCallback(() => {
    dispatch(LoadingActions.stopAppLoadingAction());
  }, [dispatch]);

  return { startLoading, stopLoading };
};

export default useUpdateAppLoading;
