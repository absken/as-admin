import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { LinearProgress } from '@mui/material';
import PropTypes from 'prop-types';
import {
  DataGridPro,
  GridColDef,
  useGridApiRef,
  GridSortItem,
  GridSortModel,
} from '@mui/x-data-grid-pro';

import { AsDataGridColumnMenu } from './AsDataGridColumnMenu';
import { AsDataGridToolbar } from './AsDataGridToolbar';
import useGetResources from '../../store/resources/useGetResources';
import { AsDataGridContextProvider } from './AsDataGridContextProvider';

export interface AsDataGridProps {
  resourceName: string;
  columns: GridColDef[];
  payload?: any;
  search?: string[];
  filter?: any[];
  filters?: ReactElement[];
  filterDefaultValues?: object;
  page: number;
  pageSize?: number;
  sort?: GridSortItem;
  rowHeight?: number;
  checkboxSelection?: boolean;
  rowsPerPageOptions?: number[];
  [key: string]: any;
}

const defaultSort = [
  {
    field: 'id',
    sort: 'asc',
  },
];

export function AsDataGrid(props: AsDataGridProps) {
  const {
    resourceName,
    columns,
    payload,
    sort: initSort = defaultSort,
    page: initPage = 1,
    pageSize: initPageSize = 10,
    search: initSearch = [],
    filter: initFilter = [],
    rowsPerPageOptions = [10, 25, 50, 100],
    rowHeight = 38,
    checkboxSelection = false,
    debounce = 500,
  } = props;

  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState<number>(initPage);
  const [pageSize, setPageSize] = useState<number>(initPageSize);
  const [sort, setSort] = useState<any>(initSort);
  const [search, setSearch] = useState<string[]>(initSearch);
  const [filter, setFilter] = useState<any[]>(initFilter);
  const [rowCount, setRowCount] = useState<number>(0);
  const apiRef = useGridApiRef();

  const { data, dataList, pagination, isLoading, error, customError, isDataSet, refetch } =
    useGetResources(resourceName, payload, {
      page,
      limit: pageSize,
      sort,
      search,
      filter,
    });

  useEffect(() => {
    setRows(dataList);
  }, [dataList]);

  useEffect(() => {
    if (pagination && pagination.page !== undefined && pagination.page !== null) {
      setPage(pagination.page);
    } else {
      setPage(1);
    }
  }, [pagination.page]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (pagination && pagination.total !== undefined && pagination.total !== null) {
      setRowCount(pagination.total);
    } else {
      setRowCount(0);
    }
  }, [pagination.total]); // eslint-disable-line react-hooks/exhaustive-deps

  const zbPage = useMemo(() => page - 1, [page]);

  const requestSearch = (searchValue: string) => {};

  const onSortModelChange = (newSortModel: GridSortModel) => {
    setSort(newSortModel);
  };

  const dataGridContextValue = useMemo(
    () => ({
      resourceName,
      payload,
      search,
      setSearch,
    }),
    [resourceName, payload, search]
  );

  return (
    <div className="flex flex-col w-full">
      <div className="flex-grow">
        <AsDataGridContextProvider value={dataGridContextValue}>
          <DataGridPro
            apiRef={apiRef}
            columns={columns}
            rows={rows}
            initialState={{
              pagination: { pageSize, page: zbPage },
              sorting: {
                sortModel: sort,
              },
            }}
            page={zbPage}
            onPageChange={(newPage) => setPage(newPage + 1)}
            pageSize={pageSize}
            onPageSizeChange={(newPagSize) => setPageSize(newPagSize)}
            rowCount={rowCount}
            sortModel={sort}
            onSortModelChange={onSortModelChange}
            rowsPerPageOptions={rowsPerPageOptions}
            components={{
              Toolbar: AsDataGridToolbar,
              ColumnMenu: AsDataGridColumnMenu,
              LoadingOverlay: LinearProgress,
            }}
            pagination
            paginationMode="server"
            sortingMode="server"
            loading={isLoading}
            checkboxSelection={checkboxSelection}
            hideFooter
            rowHeight={rowHeight}
            autoHeight
            disableSelectionOnClick
            className="bg-white shadow-md"
          />
        </AsDataGridContextProvider>
      </div>
    </div>
  );
}

AsDataGrid.propTypes = {
  resourceName: PropTypes.string,
  columns: PropTypes.instanceOf(Array),
  payload: PropTypes.instanceOf(Object),
  search: PropTypes.instanceOf(Array),
  filter: PropTypes.instanceOf(Array),
  page: PropTypes.number,
  pageSize: PropTypes.number,
  sort: PropTypes.instanceOf(Array),
  rowHeight: PropTypes.number,
  checkboxSelection: PropTypes.bool,
  rowsPerPageOptions: PropTypes.instanceOf(Array),
};

AsDataGrid.displayName = 'AsDataGrid';
