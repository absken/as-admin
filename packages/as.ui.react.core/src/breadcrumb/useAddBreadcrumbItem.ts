import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as BreadcrumbsActions from './store/breadcrumbs.action';

const useAddBreadcrumbItem = (route: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(BreadcrumbsActions.addBreadcrumbAction(route));
  }, [route, dispatch]);
};

export default useAddBreadcrumbItem;
