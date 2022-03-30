import React from 'react';
import PropTypes from 'prop-types';

import { AsDataGridContext } from './AsDataGridContext';

/**
 * @example
 *
 * const MyDataGrid = (props) => {
 *     const controllerProps = { resourceName: 'employees' };
 *     return (
 *         <AsDataGridContextProvider value={controllerProps}>
 *             <DataGrid
 *             ....
 *             />
 *         </AsDataGridContextProvider>
 *     );
 * };
 *
 * const MyPagination = () => {
 *     const { resourceName } = useContext(AsDataGridContext);
 * }
 */

export function AsDataGridContextProvider(props: any) {
  const { value, children } = props;
  return <AsDataGridContext.Provider value={value}>{children}</AsDataGridContext.Provider>;
}

AsDataGridContextProvider.propTypes = {
  value: PropTypes.instanceOf(Object),
  children: PropTypes.node,
};
