import { useContext, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodGet from 'lodash/get';
import lodMerge from 'lodash/merge';
import {
  defaultMessageResource,
  TranslationContext,
  useCallAndRefreshI18nProviderMethod,
  useRefreshVersion,
  utils,
} from '@as/ui-react-core';

import * as MessageResourceActions from './messageResource.action';

/**
 *
 * @example
 *
 * import { useGetMessageResource } from 'app-name';
 *
 * const SamplePage = ({ record }) => {
 *     const { data, dataApp, isLoading, error, customError, isMessageResourceSet, refetch } = useGetMessageResource(['app']);
 *     if (error) { return <p>ERROR</p>; }
 *     if (customError) { return <p>Custom Error</p>; }
 *     if (!isMessageResourceSet) { return <CircularProgress size="3em" /> }
 *     return <div>This is a sample page</div>;
 * };
 */
const useGetMessageResource = (namespaces: string[]) => {
  const dispatch = useDispatch();
  const callAndRefreshI18nProviderMethod = useCallAndRefreshI18nProviderMethod();
  const { i18nProvider } = useContext(TranslationContext);
  const refreshVersion = useRefreshVersion(); // used to allow force reload

  const dataApp = useSelector((state) => lodGet(state, ['messageResource', 'dataApp']));
  const data = useSelector((state) => lodGet(state, ['messageResource', 'data']));
  const isLoading = useSelector((state) => lodGet(state, ['messageResource', 'isLoading']));
  const error = useSelector((state) => lodGet(state, ['messageResource', 'error']));
  const customError = useSelector((state) => lodGet(state, ['messageResource', 'customError']));

  // refreshVersion: refetch everywhere's application using refreshVersion including this hook's api
  // innerVersion: refetch only this hook's api
  const [innerVersion, setInnerVersion] = useState(0);
  const requestSignature = JSON.stringify({
    namespaces,
    refreshVersion,
    innerVersion,
  });

  const refetch = useCallback(() => {
    setInnerVersion((prevInnerVersion) => prevInnerVersion + 1);
  }, []);

  const [state, setState] = utils.useSafeSetState({
    dataApp,
    data,
    isLoading,
    error,
    customError,
    isMessageResourceSet: false,
    refetch,
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      dataApp,
      data,
      isLoading,
      error,
      customError,
      refetch,
    }));
  }, [dataApp, data, isLoading, error, customError, refetch, setState]);

  useEffect(() => {
    dispatch(
      MessageResourceActions.getMessageResource(namespaces, {
        next: (err: any, messageResource: any) => {
          if (!err) {
            const finalMessageResource = lodMerge(defaultMessageResource, messageResource);
            // refresh i18nProvider
            callAndRefreshI18nProviderMethod('replace', [
              finalMessageResource[i18nProvider.getLocale()],
            ]).then(() => {
              setState((prevState) => ({
                ...prevState,
                isMessageResourceSet: true,
              }));
            });
          }
        },
      })
    );
  }, [requestSignature, dispatch, setState]); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
};

export default useGetMessageResource;
