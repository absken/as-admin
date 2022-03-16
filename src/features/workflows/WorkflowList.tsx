import React, { lazy } from 'react';
import {
  useAutosetPageTitle,
  useSetRootBreadcrumbItem,
  useRefreshVersion,
} from '@as/ui-react-core';

import { DataGridPro, GridColDef, GridValueGetterParams } from '@mui/x-data-grid-pro';

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
];

function WorkflowList(props: any) {
  // const { route = {} } = props;

  useAutosetPageTitle('app.title');
  useSetRootBreadcrumbItem(null);

  const refreshVersion = useRefreshVersion();

  return (
    <React.Fragment key={refreshVersion}>
      <div className="px-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Workflow Items</h1>
      </div>
      <div style={{ height: 520, width: '100%' }}>
        <DataGridPro
          rows={rows}
          columns={columns}
          rowHeight={38}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </React.Fragment>
  );
}

export default WorkflowList;
