import React from 'react';
import PropTypes from 'prop-types';

import { CoreProps } from './types';
import AppCoreContext from './AppCoreContext';

const AppCore = (props: CoreProps) => {
  const {
    theme,
    children,
    history,
    initialState,
    appCustomReducers,
    appCustomInterceptor,
    appConfig,
    appNavigation,
  } = props;

  return (
    <AppCoreContext
      theme={theme}
      history={history}
      initialState={initialState}
      appCustomReducers={appCustomReducers}
      appCustomInterceptor={appCustomInterceptor}
      appConfig={appConfig}
      appNavigation={appNavigation}
    >
      {children}
    </AppCoreContext>
  );
};

AppCore.propTypes = {
  theme: PropTypes.object,
  children: PropTypes.node,
  history: PropTypes.object,
  initialState: PropTypes.object,
  appCustomReducers: PropTypes.object,
  appCustomInterceptor: PropTypes.func,
  appConfig: PropTypes.object,
  appNavigation: PropTypes.array,
};

export default AppCore;