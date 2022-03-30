import { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodGet from 'lodash/get';
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
  const ids = useSelector((state) => lodGet(state, [resourceName, 'resources', 'ids']));
  const isLoading = useSelector((state) => lodGet(state, [resourceName, 'resources', 'isLoading']));
  const pagination = useSelector((state) =>
    lodGet(state, [resourceName, 'resources', 'pagination'])
  );
  const error = useSelector((state) => lodGet(state, [resourceName, 'resources', 'error']));
  const customError = useSelector((state) =>
    lodGet(state, [resourceName, 'resources', 'customError'])
  );

  // refreshVersion: refetch everywhere of application using refreshVersion including this hook's api
  // innerVersion: refetch only this hook's api
  const [innerVersion, setInnerVersion] = useState(0);
  const requestSignature = JSON.stringify({
    refreshVersion,
    innerVersion,
    page: params.page,
    limit: params.limit,
    sort: params.sort,
    search: params.search,
    filter: params.filter,
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
  }, [isLoading, error, customError, refetch, setState]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reload data
  useEffect(() => {
    dispatch(
      ResourcesActions.getResources(resourceName, payload, {
        next: (err: any) => {
          if (!err) {
            setState((prevState) => ({
              ...prevState,
              isDataSet: true,
            }));
          }
        },
        ...params,
      })
    );
  }, [requestSignature, dispatch, setState]); // eslint-disable-line react-hooks/exhaustive-deps

  const dataList = useMemo(() => ids.map((id: string | number) => data[id]), [ids, data]);

  return {
    ...state,
    dataList,
  };
};

export default useGetResources;
