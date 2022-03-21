import { useContext, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodGet from 'lodash/get';
import lodMerge from 'lodash/merge';
import { useRefreshVersion, utils } from '@as/ui-react-core';

import * as ResourcesActions from './resources.action';

/**
 *
 * @example
 *
 * import { useGetResources } from 'app-name';
 *
 * const SamplePage = ({ record }) => {
 *     const { data, pagination, isLoading, error, customError, isDataSet, refetch } = useGetResources('customers');
 *     if (error) { return <p>ERROR</p>; }
 *     if (customError) { return <p>Custom Error</p>; }
 *     if (!isDataSet) { return <CircularProgress size="3em" /> }
 *     return <div>This is a sample page</div>;
 * };
 */
const useGetResources = (resourceName: string, payload: any, params: any) => {
  const dispatch = useDispatch();
  const refreshVersion = useRefreshVersion(); // used to allow force reload

  const data = useSelector((state) => lodGet(state, [resourceName, 'resources', 'data']));
  const isLoading = useSelector((state) => lodGet(state, [resourceName, 'resources', 'isLoading']));
  const pagination = useSelector((state) =>
    lodGet(state, [resourceName, 'resources', 'pagination'])
  );
  const error = useSelector((state) => lodGet(state, [resourceName, 'resources', 'error']));
  const customError = useSelector((state) =>
    lodGet(state, [resourceName, 'resources', 'customError'])
  );

  // refreshVersion: refetch everywhere's application using refreshVersion including this hook's api
  // innerVersion: refetch only this hook's api
  const [innerVersion, setInnerVersion] = useState(0);
  const requestSignature = JSON.stringify({
    refreshVersion,
    innerVersion,
  });

  const refetch = useCallback(() => {
    setInnerVersion((prevInnerVersion) => prevInnerVersion + 1);
  }, []);

  const [state, setState] = utils.useSafeSetState({
    data,
    isLoading,
    pagination,
    error,
    customError,
    isDataSet: false, // data initialized
    refetch,
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      data,
      isLoading,
      pagination,
      error,
      customError,
      refetch,
    }));
  }, [isLoading, error, customError, refetch, setState]);

  useEffect(() => {
    dispatch(
      ResourcesActions.getResources(resourceName, payload, {
        next: (err: any, peeledData: any, response: any) => {
          if (!err) {
            setState((prevState) => ({
              ...prevState,
              data: peeledData,
              isDataSet: true,
            }));
          }
        },
        ...params,
      })
    );
  }, [requestSignature, params.page, params.limit, params.sort, dispatch, setState]); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
};

export default useGetResources;
