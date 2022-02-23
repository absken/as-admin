import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { defaultConfig } from '../config';
import { captureErrorMessage } from '../utils';
import useLogout from './useLogout';
import { useNotify } from '../notificaton';

import * as AuthActions from './store/auth.action';

const emptyParams = {};

/**
 * Restrict access to authenticated users.
 * Redirect anonymous users to the login page.
 *
 * @example
 *     import { useAuthenticated } from 'app-name';
 *     const FooPage = () => {
 *         useAuthenticated();
 *         return <Foo />;
 *     }
 *     const CustomRoutes = [
 *         <Route path="/foo" render={() => <FooPage />} />
 *     ];
 */
const useAuthenticated = (
  params = emptyParams,
  logoutOnFailure = true,
  redirectTo = defaultConfig.auth.loginUrl,
  disableNotification = false
) => {
  const dispatch = useDispatch();
  const notify = useNotify();
  const logout = useLogout();

  useEffect(() => {
    dispatch(
      AuthActions.authLoginCheck(params, (err) => {
        if (!err) {
        } else {
          if (logoutOnFailure) {
            logout({}, err && err.redirectTo ? err.redirectTo : redirectTo);
          }
          !disableNotification &&
            notify(captureErrorMessage(err, 'app.auth.pleaseLogin'), 'error', {});
        }
      })
    );
  }, [params, disableNotification, logout, logoutOnFailure, notify, redirectTo, dispatch]);
};

export default useAuthenticated;
