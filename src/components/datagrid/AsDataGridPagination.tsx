import React from 'react';
import {
  gridPageCountSelector,
  gridPageSelector,
  gridPageSizeSelector,
  useGridApiContext,
  useGridSelector,
  GridPagination,
} from '@mui/x-data-grid-pro';
import { Pagination, TablePagination } from '@mui/material';

export function AsDataGridPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const selectedRows = apiRef.current.getSelectedRows();

  return (
    <div className="w-full flex flex-col justify-between mt-4 md:flex-row">
      <div className="flex justify-start my-auto mx-4">
        {selectedRows.size > 0 && <span>{selectedRows.size} rows selected</span>}
      </div>
      <div className="flex flex-col gap-x-4 justify-end mx-4 md:flex-row">
        <GridPagination />
        <Pagination
          count={pageCount}
          page={page + 1}
          color="primary"
          onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
      </div>
    </div>
  );
}
