import React from 'react';

import { AsDataGridTopToolbar } from './AsDataGridTopToolbar';
import { AsDataGridPagination } from './AsDataGridPagination';

export function AsDataGridToolbar() {
  return (
    <div>
      <AsDataGridTopToolbar />
      <AsDataGridPagination />
    </div>
  );
}
