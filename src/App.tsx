import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppCore } from '@as/ui-react-core';
import CssBaseline from '@mui/material/CssBaseline';

import { appReducer } from './store';
import { appConfig } from './appConfig';
import navigation from './nav';
import './styles/css/app.scss';

const loading = <div>Please wait...</div>;
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
const Login = React.lazy(() => import('./layout/pages/Login'));
const Register = React.lazy(() => import('./layout/pages/Register'));
const Page404 = React.lazy(() => import('./layout/pages/Page404'));
const Page500 = React.lazy(() => import('./layout/pages/Page500'));

function App() {
  // Get Default themeType
  return (
    <AppCore
      appConfig={appConfig}
      appNavigation={navigation}
      appCustomReducers={appReducer}
      appCustomInterceptor={undefined}
    >
      <CssBaseline />
      <React.Suspense fallback={loading}>
        <Switch>
          <Route exact path="/login" render={(props) => <Login {...props} />} />
          <Route exact path="/register" render={(props) => <Register {...props} />} />
          <Route exact path="/404" render={(props) => <Page404 {...props} />} />
          <Route exact path="/500" render={(props) => <Page500 {...props} />} />
          <Route path="/" render={(props) => <DefaultLayout {...props} />} />
        </Switch>
      </React.Suspense>
    </AppCore>
  );
}

export default App;
