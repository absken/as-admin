import React, { useCallback, useMemo, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { useSafeSetState } from '@as/ui-react-bs';
import { TranslationContext } from './TranslationContext';
import { I18nProvider } from '../types';

export interface TranslationProviderProps {
  locale?: string;
  i18nProvider: I18nProvider;
  children: ReactNode;
}

const TranslationProvider = (props: TranslationProviderProps) => {
  const { i18nProvider, children } = props;
  const [state, setState] = useSafeSetState({
    locale: i18nProvider ? i18nProvider.getLocale() : 'en',
    i18nProvider,
    innerVersion: 0,
  });

  const setLocale = useCallback(
    (newLocale) => setState((state) => ({ ...state, locale: newLocale })),
    [setState]
  );

  const refreshI18n = useCallback(() => {
    setState((state) => ({ ...state, innerVersion: state.innerVersion + 1 }));
  }, [setState]);

  // Allow locale modification by including setLocale in the context
  // This can't be done in the initial state because setState doesn't exist yet
  const value = useMemo(
    () => ({
      ...state,
      setLocale,
      refreshI18n,
    }),
    [setLocale, refreshI18n, state]
  );

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
};

TranslationProvider.propTypes = {
  i18nProvider: PropTypes.object,
  children: PropTypes.node,
};

export default TranslationProvider;
