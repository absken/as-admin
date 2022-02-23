import defaultI18nProvider, { defaultMessageResource } from './defaultI18nProvider';
import { TranslationContext } from './TranslationContext';
import TranslationProvider from './TranslationProvider';
import useLocale from './useLocale';
import useSetLocale from './useSetLocale';
import useTranslate from './useTranslate';
import useCallAndRefreshI18nProviderMethod from './useCallAndRefreshI18nProviderMethod';

export {
  defaultI18nProvider,
  defaultMessageResource,
  TranslationContext,
  TranslationProvider,
  useLocale,
  useSetLocale,
  useTranslate,
  useCallAndRefreshI18nProviderMethod,
};

export const DEFAULT_LOCALE = 'en';

export * from './utilsTranslation';
export * from './TranslationContext';
