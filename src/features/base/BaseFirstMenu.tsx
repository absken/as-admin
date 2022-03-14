import React, { lazy } from 'react';
import {
  useAutosetPageTitle,
  useSetRootBreadcrumbItem,
  useRefreshVersion,
} from '@as/ui-react-core';

function BaseFirstMenu(props: any) {
  // const { route = {} } = props;

  useAutosetPageTitle('app.title');
  useSetRootBreadcrumbItem(null);

  const refreshVersion = useRefreshVersion();

  return (
    <React.Fragment key={refreshVersion}>
      <div className="px-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Base First Menu</h1>
      </div>
    </React.Fragment>
  );
}

export default BaseFirstMenu;
