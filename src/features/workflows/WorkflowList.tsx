import React, { useEffect, useMemo, useState } from 'react';
import lodValues from 'lodash/values';
import {
  useAutosetPageTitle,
  useSetRootBreadcrumbItem,
  useRefreshVersion,
} from '@as/ui-react-core';
import {
  CircularProgress,
  Pagination,
  TablePagination,
  LinearProgress,
  TextField,
  IconButton,
} from '@mui/material';
import {
  DataGridPro,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarExport,
  GridColumnMenu,
  GridColumnMenuContainer,
  GridColumnMenuProps,
  GridFilterMenuItem,
  HideGridColMenuItem,
  GridColumnPinningMenuItems,
  GridColDef,
  GridValueGetterParams,
  gridPageSelector,
  gridPageCountSelector,
  gridPageSizeSelector,
  useGridApiContext,
  useGridSelector,
  useGridApiRef,
  GridSortModel,
} from '@mui/x-data-grid-pro';
import { MdClear, MdSearch } from 'react-icons/md';

import { createTheme } from '@mui/material/styles';
import useGetResources from '../../store/resources/useGetResources';
import { getAppTheme } from '../../styles/theme/themes';

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

interface QuickSearchToolbarProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}

function escapeRegExp(value: string): string {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function QuickSearchToolbar(props: QuickSearchToolbarProps) {
  const { value, onChange, clearSearch } = props;
  return (
    <div className="w-full flex justify-between my-2">
      <div className="flex justify-start my-auto mx-4">
        <TextField
          variant="standard"
          value={value}
          onChange={onChange}
          placeholder="Search…"
          className="bg-black/[.04] rounded-t-md"
          InputProps={{
            startAdornment: <MdSearch size="2.0rem" className="mr-2" />,
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                style={{ visibility: value ? 'visible' : 'hidden' }}
                onClick={clearSearch}
              >
                <MdClear size="1.2rem" className="ml-2" />
              </IconButton>
            ),
          }}
        />
      </div>
      <div className="flex gap-x-4 justify-end mx-4">
        <GridToolbarContainer>
          <GridToolbarFilterButton className="mx-1" />
          <GridToolbarColumnsButton className="mx-1" />
          <GridToolbarExport className="mx-1" />
        </GridToolbarContainer>
      </div>
    </div>
  );
}

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
    <div className="w-full flex flex-col justify-between mt-2 md:flex-row">
      <div className="flex justify-start my-auto mx-4">
        {selectedRows.size > 0 && <span>{selectedRows.size} rows selected</span>}
      </div>
      <div className="flex flex-col gap-x-4 justify-end mx-4 md:flex-row">
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

function CustomToolbar(props: QuickSearchToolbarProps) {
  const { value, onChange, clearSearch } = props;

  return (
    <div>
      <QuickSearchToolbar value={value} onChange={onChange} clearSearch={clearSearch} />
      <CustomPagination />
    </div>
  );
}

function CustomColumnMenuComponent(props: GridColumnMenuProps) {
  const { hideMenu, currentColumn } = props;

  return (
    <GridColumnMenuContainer {...props}>
      <GridFilterMenuItem onClick={hideMenu} column={currentColumn!} />
      <HideGridColMenuItem onClick={hideMenu} column={currentColumn!} />
      <GridColumnPinningMenuItems onClick={hideMenu} column={currentColumn!} />
    </GridColumnMenuContainer>
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
  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = React.useState<any[]>([]);
  const apiRef = useGridApiRef();

  const { data, pagination, isLoading, error, customError, isDataSet, refetch } = useGetResources(
    'workflows',
    null,
    {
      page: page + 1,
      limit: pageSize,
      sort: JSON.stringify(sortModel),
    }
  );

  const workflows = useMemo(() => {
    return lodValues(data);
  }, [data]);

  useEffect(() => {
    setRows(workflows);
  }, [data]);

  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = workflows.filter((row: any) => {
      return Object.keys(row).some((field: any) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  const onSortModelChange = (newSortModel: GridSortModel) => {
    setSortModel(newSortModel);
  };

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
              rows={rows}
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
              onSortModelChange={onSortModelChange}
              rowsPerPageOptions={[10, 25, 50, 100]}
              className="bg-white shadow-md"
              components={{
                Toolbar: CustomToolbar,
                ColumnMenu: CustomColumnMenuComponent,
                LoadingOverlay: LinearProgress,
              }}
              componentsProps={{
                toolbar: {
                  value: searchText,
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                    requestSearch(event.target.value),
                  clearSearch: () => requestSearch(''),
                },
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
