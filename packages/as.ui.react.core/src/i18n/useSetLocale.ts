import { useContext, useCallback } from 'react';

import { TranslationContext } from './TranslationContext';
import { useUpdateLoading } from '../loading';

/**
 * Set the current locale using the TranslationContext
 *
 * This hook re-renders when the locale changes.
 *
 * @example
 *
 * import { useSetLocale } from 'appname';
 *
 * const availableLanguages = {
 *     en: 'English',
 *     fr: 'Français',
 * }
 * const LanguageSwitcher = () => {
 *     const setLocale = useSetLocale();
 *     return (
 *         <ul>{
 *             Object.keys(availableLanguages).map(locale => {
 *                  <li key={locale} onClick={() => setLocale(locale)}>
 *                      {availableLanguages[locale]}
 *                  </li>
 *              })
 *         }</ul>
 *     );
 * }
 */
const useSetLocale = () => {
  const { setLocale, i18nProvider } = useContext(TranslationContext);
  const { startLoading, stopLoading } = useUpdateLoading();

  return useCallback(
    (newLocale) =>
      new Promise((resolve) => {
        startLoading();
        // so we systematically return a Promise for the messages
        // i18nProvider may return a Promise for language changes,
        resolve(i18nProvider.changeLocale(newLocale));
      })
        .then(() => {
          stopLoading();
          setLocale(newLocale);
        })
        .catch((error) => {
          stopLoading();
        }),
    [i18nProvider, setLocale, startLoading, stopLoading]
  );
};

export default useSetLocale;
