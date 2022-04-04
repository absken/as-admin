import { useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { defaultConfig } from '../config';
import * as AuthActions from './store/auth.action';
import { LocationState } from '../types';

/**
 * redirect to the previous authenticated page (or the home page) on success.
 * @returns {Function} login callback
 *
 * @example
 *
 * import { useLogin } from 'app-name';
 *
 * const LoginButton = () => {
 *     const [loading, setLoading] = useState(false);
 *     const login = useLogin();
 *     const handleClick = {
 *         setLoading(true);
 *         login({ username: 'john', password: 'p@ssw0rd' }, '/posts');
 *     }
 *     return <button onClick={handleClick}>Login</button>;
 * }
 */
const useLogin = () => {
  const location = useLocation();
  const locationState = location.state as LocationState;
  const history = useHistory();
  const dispatch = useDispatch();
  const nextPathName = locationState && locationState.nextPathname;
  const nextSearch = locationState && locationState.nextSearch;

  const login = useCallback(
    (params, pathName) =>
      dispatch(
        AuthActions.authLogin(params, (err, res) => {
          if (!err) {
            const redirectUrl =
              pathName || nextPathName + nextSearch || defaultConfig.auth.afterLoginUrl;
            history.push(redirectUrl);
          }
        })
      ),
    [history, nextPathName, nextSearch, dispatch]
  );

  return login;
};

export default useLogin;
