import { createElement, ComponentType } from 'react';
import PropTypes from 'prop-types';

import useAuthenticated from './useAuthenticated';
import usePermissionsOptimized from './usePermissionsOptimized';

export interface WithPermissionsProps {
  authParams?: object;
  component?: ComponentType<any>;
  location?: any;
  [key: string]: any;
}

/**
 * @example
 *     import { WithPermissions } from 'app-name';
 *
 *     const Foo = ({ permissions }) => (
 *         {permissions === 'admin' ? <p>Sensitive data</p> : null}
 *         <p>Not sensitive data</p>
 *     );
 *
 *     const customRoutes = [
 *         <Route path="/foo" render={() =>
 *             <WithPermissions
 *                  authParams={{ foo: 'bar' }}
 *                  component={Foo}
 *              />
 *         } />
 *     ];
 */
function WithPermissions(props: WithPermissionsProps) {
  const { authParams, component, ...rest } = props;

  useAuthenticated(authParams);
  const { permissions } = usePermissionsOptimized(authParams);
  // render even though the usePermissions() call isn't finished (optimistic rendering)
  if (component) {
    return createElement(component, { permissions, ...rest });
  }
}

WithPermissions.propTypes = {
  authParams: PropTypes.objectOf(PropTypes.any),
  component: PropTypes.elementType.isRequired,
};

export default WithPermissions as ComponentType<WithPermissionsProps>;
