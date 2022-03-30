import React, { useContext } from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { MdFileDownload } from 'react-icons/md';
import {
  gridSortModelSelector,
  gridVisibleColumnDefinitionsSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid-pro';

import { useSelector } from 'react-redux';
import { CoreState } from '@as/ui-react-core';
import lodGet from 'lodash/get';
import { AsDataGridContext } from './AsDataGridContext';
import useDownloadResourcesCsv from '../../store/resources/useDownloadResourcesCsv';

export function AsDataGridTopToolbarCsvButton(props: any) {
  const { className } = props;
  const { resourceName, payload, search } = useContext(AsDataGridContext);
  const apiRef = useGridApiContext();
  const sort = useGridSelector(apiRef, gridSortModelSelector);
  const columnsVisible = useGridSelector(apiRef, gridVisibleColumnDefinitionsSelector);
  const isLoading = useSelector((state: CoreState) =>
    lodGet(state, [resourceName, 'resources', 'isLoading'])
  );
  const downloadResourcesCsv = useDownloadResourcesCsv();

  const getDataAsCsv = () => {
    downloadResourcesCsv(resourceName, payload, sort, search, null, columnsVisible, resourceName);
  };

  return (
    <Button
      startIcon={<MdFileDownload />}
      onClick={getDataAsCsv}
      className={className}
      disabled={isLoading}
    >
      Export
    </Button>
  );
}

AsDataGridTopToolbarCsvButton.propTypes = {
  className: PropTypes.string,
};

AsDataGridTopToolbarCsvButton.displayName = 'AsDataGridTopToolbarCsvButton';
