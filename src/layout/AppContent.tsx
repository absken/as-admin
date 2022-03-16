import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { WithPermissions } from '@as/ui-react-core';
// routes config
import routes, { homeRoute } from '../routes';

const loading = <div>Please wait...</div>;

function AppContent() {
  return (
    <main>
      <Suspense fallback={loading}>
        <Switch>
          {routes.map((route: any, idx) => {
            return (
              route.component && (
                <Route
                  key={route.name}
                  path={route.path}
                  exact={route.exact}
                  render={(routeProps) => (
                    <WithPermissions component={route.component} {...routeProps} route={route} />
                  )}
                />
              )
            );
          })}
          <Route
            exact={homeRoute.exact}
            path={homeRoute.path}
            render={(routeProps) => (
              <WithPermissions component={homeRoute.component} {...routeProps} route={homeRoute} />
            )}
          />
          <Redirect to="/404" />
        </Switch>
      </Suspense>
    </main>
  );
}

export default React.memo(AppContent);
