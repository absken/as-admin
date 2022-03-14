import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodGet from 'lodash/get';
import { utils } from '@as/ui-react-core';

import * as ResourceActions from './resource.action';

/**
 *
 * @example // set params when calling the deleteResource callback
 *
 * import { useDeleteResource } from 'app-name';
 *
 * const DeleteButton = ({ record }) => {
 *     const [deleteResource, { isLoading, error, customError }] = useDeleteResource('customers');
 *     const handleClick = () => {
 *         deleteResource(id, {undoable: true, next})
 *     }
 *     if (error) { return <p>ERROR</p>; }
 *     if (customError) { return <p>Custom Error</p>; }
 *     return <button disabled={loading} onClick={handleClick}>Delete</div>;
 * };
 */
const useDeleteResource = (resourceName: string) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => lodGet(state, [resourceName, 'resource', 'isLoading']));
  const error = useSelector((state) => lodGet(state, [resourceName, 'resource', 'error']));
  const customError = useSelector((state) =>
    lodGet(state, [resourceName, 'resource', 'customError'])
  );

  const [state, setState] = utils.useSafeSetState({
    isLoading,
    error,
    customError,
  });

  useEffect(() => {
    setState({
      isLoading,
      error,
      customError,
    });
  }, [resourceName, isLoading, error, customError, setState]);

  const deleteResource = useCallback(
    (id, params) => {
      return dispatch(ResourceActions.deleteResource(resourceName, { id }, params));
    },
    [resourceName, dispatch]
  );

  return [deleteResource, state];
};

export default useDeleteResource;
