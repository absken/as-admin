import React from 'react';
import PropTypes from 'prop-types';

import { CoreProps } from '../types';
import AppCoreContext from './AppCoreContext';

function AppCore(props: CoreProps) {
  const {
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
}

AppCore.propTypes = {
  children: PropTypes.node,
  history: PropTypes.objectOf(PropTypes.any),
  initialState: PropTypes.objectOf(PropTypes.any),
  appCustomReducers: PropTypes.objectOf(PropTypes.any),
  appCustomInterceptor: PropTypes.func,
  appConfig: PropTypes.objectOf(PropTypes.any),
  appNavigation: PropTypes.arrayOf(PropTypes.any),
};

export default AppCore;
