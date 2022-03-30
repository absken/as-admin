import React, { useContext, useState } from 'react';
import { IconButton, TextField, ListItem, Chip, Paper } from '@mui/material';
import { MdClear, MdSearch } from 'react-icons/md';
import classNames from 'classnames';
import { AsDataGridContext } from './AsDataGridContext';

export interface AsDataGridTopToolbarProps {
  clearSearch: () => void;
  value: string;
}

export function AsDataGridSearch(props: any) {
  const { className } = props;

  const { search, setSearch } = useContext(AsDataGridContext);
  const [searchText, setSearchText] = useState<string>('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearch((prevState: string[]) => [...prevState, searchText]);
      clearSearchText();
    }
  };

  const clearSearchText = () => {
    setSearchText('');
  };

  const handleSearchItemDelete = (index: number) => {
    setSearch((prevState: string[]) => [
      ...prevState.slice(0, index),
      ...prevState.slice(index + 1),
    ]);
  };

  const classes = classNames('bg-black/[.04] rounded-t-md ', className);

  return (
    <div className="flex items-center gap-x-2">
      <TextField
        variant="standard"
        value={searchText}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder="Search…"
        className={classes}
        InputProps={{
          startAdornment: <MdSearch size="2.0rem" className="mr-2" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              style={{ visibility: searchText ? 'visible' : 'hidden' }}
              onClick={clearSearchText}
            >
              <MdClear size="1.2rem" className="ml-2" />
            </IconButton>
          ),
        }}
      />
      <ul className="flex flex-wrap list-none gap-x-2">
        {search.map((searchItem, index) => {
          let icon;
          return (
            // eslint-disable-next-line react/no-array-index-key
            <ListItem key={index} className="w-min m-0 p-0">
              <Chip icon={icon} label={searchItem} onDelete={() => handleSearchItemDelete(index)} />
            </ListItem>
          );
        })}
      </ul>
    </div>
  );
}
