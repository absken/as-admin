import React from 'react';
import { IconButton, TextField, Button } from '@mui/material';
import { MdClear, MdSearch, MdFileDownload } from 'react-icons/md';
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from '@mui/x-data-grid-pro';

import { AsDataGridTopToolbarCsvButton } from './AsDataGridToolbarCsvButton';
import { AsDataGridSearch } from './AsDataGridSearch';

export function AsDataGridTopToolbar() {
  return (
    <div className="w-full flex justify-between my-2">
      <div className="flex justify-start my-auto mx-4">
        <AsDataGridSearch />
      </div>
      <div className="flex gap-x-4 justify-end mx-4">
        <GridToolbarContainer>
          <GridToolbarFilterButton className="mx-1 text-sm" />
          <GridToolbarColumnsButton className="mx-1 text-sm" />
          <AsDataGridTopToolbarCsvButton className="mx-1 text-sm" />
        </GridToolbarContainer>
      </div>
    </div>
  );
}
