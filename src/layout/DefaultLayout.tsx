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
      <div className="flex min-h-screen flex-row items-center justify-center">
        <CircularProgress size="3em" />
      </div>
    );
  }

  const classNameDefaultLayout = classNames(
    'layout-body flex flex-col h-full w-full min-h-[calc(100vh-3.5rem)] bg-body relative overflow-y-auto transition-padding duration-150'
  );

  return (
    <ThemeProvider theme={appTheme}>
      <div className="bg-body">
        <AppHeader />
        <div className="flex pt-14">
          <AppSidebar />
          <AppSidebarEnd />
          <div className={classNameDefaultLayout}>
            <AppBreadcrumb />
            <div className="grow pt-12 pb-8">
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
