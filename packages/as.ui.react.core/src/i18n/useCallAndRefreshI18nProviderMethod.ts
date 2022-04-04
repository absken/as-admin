import { useContext, useCallback } from 'react';

import { TranslationContext } from './TranslationContext';
import { useUpdateLoading } from '../loading';

/**
 * @example
 *
 * import { useCallAndRefreshI18nProviderMethod } from 'app-name';
 *
 * const changeI18nProvider = () => {
 *     const callAndRefreshI18nProviderMethod = useCallAndRefreshI18nProviderMethod();
 *     // clear, replace, extend
 *     callAndRefreshI18nProviderMethod('replace', [{ "hello": "Hello" }])
 * }
 */
const useCallAndRefreshI18nProviderMethod = () => {
  const { refreshI18n, i18nProvider } = useContext(TranslationContext);
  const { startLoading, stopLoading } = useUpdateLoading();

  return useCallback(
    (method, paramArray) =>
      new Promise((resolve) => {
        startLoading();
        // @ts-ignore
        // eslint-disable-next-line prefer-spread
        resolve(i18nProvider[method].apply(i18nProvider, paramArray));
      })
        .then(() => {
          refreshI18n();
          stopLoading();
        })
        .catch((error) => {
          stopLoading();
        }),
    [i18nProvider, refreshI18n, startLoading, stopLoading]
  );
};

export default useCallAndRefreshI18nProviderMethod;
