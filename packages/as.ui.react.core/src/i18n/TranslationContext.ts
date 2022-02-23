import { createContext } from 'react';

import { I18nProvider } from '../types';

export interface TranslationContextProps {
  locale: string;
  setLocale: (locale: string) => void;
  i18nProvider: I18nProvider;
  refreshI18n: () => void;
}

const TranslationContext = createContext({
  locale: 'en',
  setLocale: (locale: string) => {},
  i18nProvider: {
    translate: (locale: string, option?: any) => locale,
    changeLocale: (locale: string) => Promise.resolve(),
    getLocale: () => 'en',
    getPolyglot: () => {},
  },
  refreshI18n: () => {},
});

TranslationContext.displayName = 'TranslationContext';

export { TranslationContext };
