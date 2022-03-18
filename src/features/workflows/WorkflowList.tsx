import React, { useState } from 'react';
import lodValues from 'lodash/values';
import {
  useAutosetPageTitle,
  useSetRootBreadcrumbItem,
  useRefreshVersion,
} from '@as/ui-react-core';
import { CircularProgress, Pagination, TablePagination } from '@mui/material';
import {
  DataGridPro,
  GridColDef,
  GridValueGetterParams,
  gridPageSelector,
  gridPageCountSelector,
  gridPageSizeSelector,
  useGridApiContext,
  useGridSelector,
  useGridApiRef,
} from '@mui/x-data-grid-pro';

import useGetResources from '../../store/resources/useGetResources';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 11, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 12, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 13, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 14, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 15, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 16, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 17, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 18, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 19, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 21, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 22, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 23, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 24, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 25, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 26, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 27, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 28, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 29, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 31, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 32, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 33, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 34, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 35, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 36, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 37, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 38, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 39, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 41, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 42, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 43, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 44, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 45, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 46, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 47, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 48, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 49, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 51, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 52, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 53, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 54, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 55, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 56, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 57, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 58, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 59, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 61, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 62, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 63, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 64, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 65, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 66, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 67, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 68, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 69, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 71, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 72, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 73, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 74, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 75, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 76, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 77, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 78, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 79, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 81, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 82, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 83, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 84, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 85, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 86, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 87, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 88, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 89, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 91, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 92, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 93, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 94, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 95, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 96, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 97, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 98, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 99, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const rowsPerPage = useGridSelector(apiRef, gridPageSizeSelector);
  const selectedRows = apiRef.current.getSelectedRows();
  const rowsCount = apiRef.current.getRowsCount();

  const setPageSize = (event: any) => {
    if (event.target && event.target.value) {
      apiRef.current.setPageSize(event.target.value);
    }
  };

  return (
    <div className="w-full flex justify-between mt-2">
      <div className="flex justify-start my-auto mx-4">
        {selectedRows.size > 0 && <span>{selectedRows.size} rows selected</span>}
      </div>
      <div className="flex gap-x-4 justify-end">
        <TablePagination
          component="div"
          count={rowsCount}
          page={page}
          onPageChange={(event, value) => apiRef.current.setPage(value - 1)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={setPageSize}
          rowsPerPageOptions={[10, 25, 50, 100]}
        />
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

function WorkflowList(props: any) {
  // const { route = {} } = props;

  useAutosetPageTitle('app.title');
  useSetRootBreadcrumbItem(null);

  const DEFAULT_PAGE_SIZE = 10;
  const refreshVersion = useRefreshVersion();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sortModel, setSortModel] = useState<any>([]);
  const apiRef = useGridApiRef();

  const {
    data: workflows,
    pagination,
    isLoading,
    error,
    customError,
    isDataSet,
    refetch,
  } = useGetResources('workflows', null, {
    page: page + 1,
    limit: pageSize,
    sort: JSON.stringify(sortModel),
  });

  if (!isDataSet) {
    return (
      <div className="flex min-h-screen flex-row items-center justify-center">
        <CircularProgress size="3em" />
      </div>
    );
  }

  return (
    <React.Fragment key={refreshVersion}>
      <main className="px-6">
        <div className="pb-2">
          <h6 className="sm:text-2xl font-bold">Workflow Items</h6>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex-grow">
            <DataGridPro
              apiRef={apiRef}
              rows={lodValues(workflows)}
              rowCount={pagination.total}
              columns={columns}
              rowHeight={38}
              autoHeight
              checkboxSelection
              disableSelectionOnClick
              initialState={{
                pagination: { pageSize: DEFAULT_PAGE_SIZE },
                sorting: {
                  sortModel: [{ field: 'id', sort: 'desc' }],
                },
              }}
              page={page}
              onPageChange={(newPage) => setPage(newPage)}
              pageSize={pageSize}
              onPageSizeChange={(newPagSize) => setPageSize(newPagSize)}
              pagination
              paginationMode="server"
              sortingMode="server"
              sortModel={sortModel}
              onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
              rowsPerPageOptions={[10, 25, 50, 100]}
              className="bg-white shadow-md"
              components={{
                Toolbar: CustomPagination,
              }}
              hideFooter
              loading={isLoading}
            />
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}

export default WorkflowList;
