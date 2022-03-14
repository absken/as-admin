import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodGet from 'lodash/get';
import { utils } from '@as/ui-react-core';

import * as ResourcesActions from './resources.action';

/**
 *
 * @example // set params when calling the deleteResources callback
 *
 * import { useDeleteResources } from 'app-name';
 *
 * const DeleteButton = ({ record }) => {
 *     const [deleteResources, { isLoading, error, customError }] = useDeleteResources('customers');
 *     const handleClick = () => {
 *         deleteResources(selectedIds, {undoable: true, next})
 *     }
 *     if (error) { return <p>ERROR</p>; }
 *     if (customError) { return <p>Custom Error</p>; }
 *     return <button disabled={loading} onClick={handleClick}>Delete</div>;
 * };
 */
const useDeleteResources = (resourceName: any) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => lodGet(state, [resourceName, 'resources', 'isLoading']));
  const error = useSelector((state) => lodGet(state, [resourceName, 'resources', 'error']));
  const customError = useSelector((state) =>
    lodGet(state, [resourceName, 'resources', 'customError'])
  );

  const [state, setState] = utils.useSafeSetState({
    isLoading,
    error,
    customError,
  });

  const deleteResources = useCallback(
    (ids, params) => {
      return dispatch(ResourcesActions.deleteResources(resourceName, { ids }, params));
    },
    [resourceName, dispatch]
  );

  useEffect(() => {
    setState({
      isLoading,
      error,
      customError,
    });
  }, [resourceName, isLoading, error, customError, setState]);

  return [deleteResources, state];
};

export default useDeleteResources;
