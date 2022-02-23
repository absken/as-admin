import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import lodIsEmpty from 'lodash/isEmpty';

import * as BreadcrumbsActions from './store/breadcrumbs.action';

const useSetRootBreadcrumbItem = (route: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(BreadcrumbsActions.resetBreadcrumbAction());

    if (!lodIsEmpty(route)) {
      dispatch(BreadcrumbsActions.addBreadcrumbAction(route));
    }
  }, [dispatch, route]);
};

export default useSetRootBreadcrumbItem;
