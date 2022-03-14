import * as React from 'react';
import { useContext, useState } from 'react';
import { Provider, ReactReduxContext } from 'react-redux';
import { getHistoryInstance } from './getHistory';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import lodMerge from 'lodash/merge';

import createAppCoreStore from './createAppCoreStore';
import { TranslationProvider, defaultI18nProvider } from '../i18n';
import { ConfigContext, defaultConfig } from '../config';
import { NavigationContext, defaultNavigation } from '../navigation';
import { CoreProps } from '../types';

const AppCoreContext = (props: CoreProps) => {
  const {
    children,
    history,
    initialState,
    appCustomReducers,
    appCustomInterceptor,
    appConfig,
    appNavigation,
  } = props;
  const reduxIsAlreadyInitialized = !!useContext(ReactReduxContext);
  const finalAppConfig = lodMerge(defaultConfig, appConfig);
  const finalAppNavigation = lodMerge(defaultNavigation, appNavigation) || [];
  const finalHistory = getHistoryInstance(history);

  const renderCore = () => {
    return (
      <ConfigContext.Provider value={finalAppConfig}>
        <TranslationProvider i18nProvider={defaultI18nProvider}>
          <NavigationContext.Provider value={finalAppNavigation}>
            {typeof window !== 'undefined' ? (
              <ConnectedRouter history={finalHistory}>{children}</ConnectedRouter>
            ) : (
              children
            )}
          </NavigationContext.Provider>
        </TranslationProvider>
      </ConfigContext.Provider>
    );
  };

  const [store] = useState(() =>
    !reduxIsAlreadyInitialized
      ? createAppCoreStore({
          appCustomReducers,
          appCustomInterceptor,
          initialState,
          history: finalHistory,
        })
      : undefined
  );

  if (reduxIsAlreadyInitialized || !store) {
    if (!history) {
      throw new Error(`Missing history prop.
When integrating react-admin inside an existing redux Provider, you must provide the same 'history' prop to the <Admin> as the one used to bootstrap your routerMiddleware.
React-admin uses this history for its own ConnectedRouter.`);
    }
    return renderCore();
  } else {
    return <Provider store={store}>{renderCore()}</Provider>;
  }
};

AppCoreContext.propTypes = {
  children: PropTypes.node,
  history: PropTypes.object,
  initialState: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  appCustomReducers: PropTypes.object,
  appCustomInterceptor: PropTypes.func,
  appConfig: PropTypes.object,
  appNavigation: PropTypes.array,
};

export default AppCoreContext;
