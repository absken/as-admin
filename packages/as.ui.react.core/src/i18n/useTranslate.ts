import { useContext, useCallback } from 'react';

import { TranslationContext } from './TranslationContext';

/**
 * Translate a string using the current locale and the translations from the i18nProvider
 *
 * @see Polyglot.t()
 * @link https://airbnb.io/polyglot.js/#polyglotprototypetkey-interpolationoptions
 *
 * @return {Function} A translation function, accepting two arguments
 *   - a string used as key in the translations
 *   - an interpolationOptions object
 *
 * @example
 *
 * const SettingsMenu = () => {
 *     const translate = useTranslate();
 *     return <MenuItem>{translate('settings')}</MenuItem>;
 * }
 */
const useTranslate = () => {
  const { i18nProvider, locale } = useContext(TranslationContext);
  const translate = useCallback(
    (key: string, options?: object) => i18nProvider.translate(key, options),
    // update the hook each time the locale changes
    [i18nProvider, locale] // eslint-disable-line react-hooks/exhaustive-deps
  );
  return i18nProvider ? translate : identity;
};

const identity = (key: string) => key;

export default useTranslate;
