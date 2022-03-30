import React, { useEffect, useMemo, useState } from 'react';
import {
  useAutosetPageTitle,
  useSetRootBreadcrumbItem,
  useRefreshVersion,
} from '@as/ui-react-core';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid-pro';

import { AsDataGrid } from '../../components';
import { AsDataGridProps } from '../../components/datagrid/AsDataGrid';

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

function WorkflowList() {
  useAutosetPageTitle('app.title');
  useSetRootBreadcrumbItem(null);

  const refreshVersion = useRefreshVersion();
  const dataGridProps = {
    resourceName: 'workflows',
    columns,
    checkboxSelection: true,
  } as AsDataGridProps;

  return (
    <React.Fragment key={refreshVersion}>
      <main className="px-6">
        <div className="pb-2">
          <h6 className="sm:text-2xl font-bold">Workflow Items</h6>
        </div>
        <AsDataGrid {...dataGridProps} />
      </main>
    </React.Fragment>
  );
}

export default WorkflowList;
