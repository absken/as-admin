import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { CoreState, useAppNavigation } from '@as/ui-react-core';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { Button } from '@mui/material';
import * as LayoutActions from './store/layout.action';

function AppSidebarToggler() {
  const dispatch = useDispatch();
  const navigation = useAppNavigation();

  const unfoldable = useSelector((state: CoreState) => state.layout.sidebarUnfoldable);

  const handleChange = () => {
    dispatch(LayoutActions.setUI({ sidebarUnfoldable: !unfoldable }));
  };

  const classNameButton = classNames(
    'sidebar-toggler flex justify-end border-r border-gray-200 bg-gray-200 rounded-none py-2 px-4 text-primary hidden hover:bg-gray-300 md:flex'
  );

  const classNameSidebarTogglerIcon = classNames(
    'sidebar-toggler-icon transition-transform duration-150',
    {
      '-rotate-180': unfoldable === true,
    }
  );

  return (
    // eslint-disable-next-line react/button-has-type
    <Button className={classNameButton} onClick={handleChange}>
      <MdKeyboardArrowLeft size="1.8em" className={classNameSidebarTogglerIcon} />
    </Button>
  );
}

export default React.memo(AppSidebarToggler);
