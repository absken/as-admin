import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
// @ts-ignore
import { unparse } from 'papaparse';

import { GridColDef } from '@mui/x-data-grid-pro';
import * as ResourcesActions from './resources.action';

/**
 * @example
 *
 * import { useSetLocale } from 'appname';
 *
 * const availableLanguages = {
 *     en: 'English',
 *     fr: 'Français',
 * }
 * const LanguageSwitcher = () => {
 *     const setLocale = useSetLocale();
 *     return (
 *         <ul>{
 *             Object.keys(availableLanguages).map(locale => {
 *                  <li key={locale} onClick={() => setLocale(locale)}>
 *                      {availableLanguages[locale]}
 *                  </li>
 *              })
 *         }</ul>
 *     );
 * }
 */

const exportJsonCsv = (headers: any[], items: any[], filename: string) => {
  const finalFilename = filename ?? 'Exported';

  const csvHeader = unparse({
    fields: [...headers.map((item: any) => item.name)],
    data: [],
  });

  const csvVal = unparse(items, {
    header: false,
    columns: [...headers.map((item: any) => item.key)],
  });

  const csv = csvHeader + csvVal;

  const exportedFilename = `${finalFilename}.csv` || 'export.csv';
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, exportedFilename);
  } else {
    const link = document.createElement('a');
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', exportedFilename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};

const convertDataToExport = (columns: GridColDef[], dataCsv: any[]) => {
  columns.forEach((column: any) => {
    if (!column.field.startsWith('__') && column.valueGetter) {
      dataCsv.forEach((item: any) => {
        // eslint-disable-next-line no-param-reassign
        item[column.field] = column.valueGetter({ row: item });
      });
    }
  });

  return dataCsv;
};

const csvColumnDefinition = (columns: GridColDef[]): { key: string; name: string }[] => {
  const csvColumns: any[] = [];
  columns.forEach((column) => {
    if (!column.field.startsWith('__')) {
      csvColumns.push({ key: column.field, name: column.headerName });
    }
  });
  return csvColumns;
};

const useDownloadResourcesCsv = () => {
  const dispatch = useDispatch();

  return useCallback(
    (
      resourceName: string,
      payload: any,
      sort: any[],
      search: string[],
      filter: any,
      columns: any[],
      filename: string
    ) => {
      dispatch(
        ResourcesActions.getResourcesCsv(resourceName, payload, {
          next: (err: any, state: any) => {
            if (!err) {
              exportJsonCsv(
                csvColumnDefinition(columns),
                convertDataToExport(columns, state.dataCsv),
                filename
              );
            }
          },
          sort,
          search,
          filter,
        })
      );
    },
    [dispatch]
  );
};

export default useDownloadResourcesCsv;
