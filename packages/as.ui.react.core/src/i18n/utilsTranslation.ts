import lodMerge from 'lodash/merge';
import { DEFAULT_LOCALE } from './index';

interface AllNavigatorLanguage extends NavigatorLanguage {
  browserLanguage?: string;
  userLanguage?: string;
}

/**
 * Resolve the browser locale according to the value of the global window.navigator
 *
 * Use it to determine the <Admin> locale at runtime.
 *
 * @example
 *     import * as React from "react";
 *     import {resolveBrowserLocale } from 'app-name';
 *     import englishMessages from 'language-english';
 *     import frenchMessages from 'language-french';
 *     const messages = {
 *        fr: frenchMessages,
 *        en: englishMessages,
 *     };
 *     const App = () => (
 *         <Component locale={resolveBrowserLocale()} messages={messages}>
 *             ...
 *         </Component>
 *     );
 *
 * @param {string} defaultLocale Defaults to 'en'
 */
export const resolveBrowserLocale = (defaultLocale = DEFAULT_LOCALE) => {
  // from http://blog.ksol.fr/user-locale-detection-browser-javascript/
  // Rely on the window.navigator object to determine user locale
  const { language, browserLanguage, userLanguage } = window.navigator as AllNavigatorLanguage;
  return (language || browserLanguage || userLanguage || defaultLocale).split('-')[0];
};

/**
 * Compose translations from multiple packages for a single language (eg: 'english').
 *
 * Use it to merge translations from addons with the main react-admin translations.
 *
 * @example
 *     import * as React from "react";
 *     import { mergeTranslations } from 'app-name';
 *     import englishMessages from 'language-english';
 *     import englishTreeMessages from 'language-french';
 *     const messages = {
 *        en: mergeTranslations(englishMessages, englishTreeMessages),
 *     };
 *     const App = () => (
 *         <Component locale="en" messages={messages}>
 *             ...
 *         </Component>
 *     );
 */
export const mergeTranslations = (...translationsModules: any) =>
  lodMerge({}, ...translationsModules);
