import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { defaultConfig } from '../config';
import * as AuthActions from './store/auth.action';

/**
 * @example
 *
 * import { useLogout } from 'app-name';
 *
 * const LogoutButton = () => {
 *     const logout = useLogout();
 *     const handleClick = () => logout();
 *     return <button onClick={handleClick}>Logout</button>;
 * }
 */
const useLogout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = useCallback(
    (
      params = {},
      redirectTo = defaultConfig.auth.loginUrl,
      redirectToCurrentLocationAfterLogin = true
    ) =>
      dispatch(
        AuthActions.authLogout(params, () => {
          // redirectTo can contain a query string, e.g. '/login?foo=bar'
          // we must split the redirectTo to pass a structured location to history.push()
          const redirectToParts = redirectTo.split('?');
          const newLocation = {
            pathname: redirectToParts[0],
            search: '',
            state: {},
          };
          if (redirectToParts[1]) {
            // eslint-disable-next-line prefer-destructuring
            newLocation.search = redirectToParts[1];
          }

          if (
            redirectToCurrentLocationAfterLogin &&
            history.location &&
            history.location.pathname
          ) {
            newLocation.state = {
              nextPathname: history.location.pathname,
              nextSearch: history.location.search,
            };
          }
          history.push(newLocation);
        })
      ),
    [history, dispatch]
  );

  return logout;
};

export default useLogout;
