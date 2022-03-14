import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAppNavigation, CoreReduxState } from '@as/ui-react-core';

import { AsSidebar, AsSidebarNav } from '../components';
import AppSidebarNav from './AppSidebarNav';
import AppSidebarToggler from './AppSidebarToggler';
import * as LayoutActions from './store/layout.action';

function AppSidebar() {
  const dispatch = useDispatch();
  const navigation = useAppNavigation();
  const sidebarShow = useSelector((state: CoreReduxState) => state.layout.sidebarShow);
  const unfoldable = useSelector((state: CoreReduxState) => state.layout.sidebarUnfoldable);

  return (
    <AsSidebar
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible: boolean) => {
        dispatch(LayoutActions.setUI({ sidebarShow: visible }));
      }}
      className="bg-white"
    >
      <AsSidebarNav>
        <AppSidebarNav items={navigation} />
      </AsSidebarNav>
      <AppSidebarToggler />
    </AsSidebar>
  );
}

export default React.memo(AppSidebar);
