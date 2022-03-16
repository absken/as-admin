import React, { useMemo } from 'react';
import { CircularProgress, ThemeProvider } from '@mui/material';
import classNames from 'classnames';
import { useThemeType, useTriggerSessionChecker } from '@as/ui-react-core';
import { createTheme } from '@mui/material/styles';

import {
  AppHeader,
  AppSidebar,
  AppSidebarEnd,
  AppContent,
  AppFooter,
  AppBreadcrumb,
} from './index';
import { useGetMessageResource } from '../store';
import { getAppTheme } from '../styles/theme/themes';

const loading = <div>Please wait...</div>;
const Page500 = React.lazy(() => import('./pages/Page500'));

function DefaultLayout(props: any) {
  useTriggerSessionChecker();

  const themeType = useThemeType();
  const { error: messageResourceError, isMessageResourceSet } = useGetMessageResource(['app']);

  const appTheme = useMemo(() => {
    const theme = getAppTheme(themeType);
    return createTheme(theme);
  }, [themeType]);

  if (messageResourceError) {
    return (
      <React.Suspense fallback={loading}>
        <Page500 />
      </React.Suspense>
    );
  }

  if (!isMessageResourceSet) {
    return (
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center justify-content-center">
        <CircularProgress size="3em" />
      </div>
    );
  }

  const classNameDefaultLayout = classNames(
    'layout-body flex flex-col h-full w-full min-h-[calc(100vh-58px)] bg-body relative overflow-y-auto transition-padding duration-150'
  );

  return (
    <ThemeProvider theme={appTheme}>
      <div className="bg-body">
        <AppHeader />
        <div className="flex overflow-hidden pt-14">
          <AppSidebar />
          <AppSidebarEnd />
          <div className={classNameDefaultLayout}>
            <AppBreadcrumb />
            <div className="grow">
              <AppContent />
            </div>
            <AppFooter />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default DefaultLayout;
