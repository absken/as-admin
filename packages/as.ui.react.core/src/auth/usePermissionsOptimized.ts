import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import lodIsEqual from 'lodash/isEqual';

import { useSafeSetState } from '../utils';
import * as AuthActions from './store/auth.action';

export interface AlreadyFetchedPermissions {
  [key: string]: any;
}

const emptyParams = {};

// keep a cache of already fetched permissions to initialize state for new
// components and avoid a useless rerender if the permissions haven't changed
const alreadyFetchedPermissions: AlreadyFetchedPermissions = { '{}': undefined };

/**
 * Useful to enable features based on user permissions
 *
 *
 * @returns The current auth check state. Destructure as { permissions, error }.
 *
 * @example
 *     import { usePermissionsOptimized } from 'app-name';
 *
 *     const PostDetail = props => {
 *         const { permissions } = usePermissionsOptimized();
 *         if (permissions !== 'editor') {
 *             return <Redirect to={`posts/${props.id}/show`} />
 *         } else {
 *             return <PostEdit {...props} />
 *         }
 *     };
 */
const usePermissionsOptimized = (params = emptyParams) => {
  const dispatch = useDispatch();
  const key = JSON.stringify(params);
  const [state, setState] = useSafeSetState({
    permissions: alreadyFetchedPermissions[key],
  });

  useEffect(() => {
    dispatch(
      AuthActions.getUserPermissions(params, (permissions) => {
        if (!lodIsEqual(permissions, state.permissions)) {
          alreadyFetchedPermissions[key] = permissions;
          setState({ permissions });
        }
      })
    );
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
};

export default usePermissionsOptimized;
