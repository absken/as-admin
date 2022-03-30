import React, { createContext } from 'react';

export interface AsDataGridContextProps {
  resourceName: string;
  payload: any;
  search: string[];
  setSearch: (state: any) => void;
}

const AsDataGridContext = createContext<AsDataGridContextProps>({
  resourceName: '',
  payload: null,
  search: [],
  setSearch: (state: string[]) => {},
});

AsDataGridContext.displayName = 'AsDataGridContext';

export { AsDataGridContext };
