import React from 'react';

import {
  GridColumnMenuContainer,
  GridColumnMenuProps,
  GridColumnPinningMenuItems,
  GridFilterMenuItem,
  HideGridColMenuItem,
} from '@mui/x-data-grid-pro';

export function AsDataGridColumnMenu(props: GridColumnMenuProps) {
  const { hideMenu, currentColumn } = props;

  return (
    <GridColumnMenuContainer {...props}>
      <GridFilterMenuItem onClick={hideMenu} column={currentColumn!} />
      <HideGridColMenuItem onClick={hideMenu} column={currentColumn!} />
      <GridColumnPinningMenuItems onClick={hideMenu} column={currentColumn!} />
    </GridColumnMenuContainer>
  );
}
