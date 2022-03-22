import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Badge, IconButton, InputBase, Menu, MenuItem, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  MdViewHeadline,
  MdOutlineNotificationsActive,
  MdVerticalSplit,
  MdSearch,
  MdArrowDropDown,
} from 'react-icons/md';

import { CoreState, useRefreshPage } from '@as/ui-react-core';
import logoIcon from '../assets/images/as-logo-icon.png';
import AppHeaderAccountSetting from './AppHeaderAccountSetting';
import * as LayoutActions from '../layout/store/layout.action';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function AppHeader() {
  const dispatch = useDispatch();
  const refreshPage = useRefreshPage();
  const sidebarShow = useSelector((state: CoreState) => state.layout.sidebarShow);
  const sidebarEndShow = useSelector((state: CoreState) => state.layout.sidebarEndShow);

  return (
    <nav className="app-header shadow-md bg-primary border-b border-gray-200 fixed z-30 w-full text-white">
      <div className="px-3 py-2 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <IconButton
              className="p-1.5"
              aria-label="side-menu"
              onClick={() => dispatch(LayoutActions.setUI({ sidebarShow: !sidebarShow }))}
            >
              <MdViewHeadline className="text-white" size="1.1em" />
            </IconButton>
            <a href="aaa" className="text-xl font-bold flex items-center lg:ml-2.5">
              <img src={logoIcon} alt="AbsenceSoft Admin" className="h-7 mr-2" />
              <span className="self-center whitespace-nowrap">
                AbsenceSoft <span className="text-secondary">Admin</span>
              </span>
            </a>
            <MenuItem className="ml-12 font-bold" key="MENU1">
              <span className="font-bold text-sm">MENU1</span> <MdArrowDropDown size="1.2em" />
            </MenuItem>
            <MenuItem key="MENU2">
              <Typography className="font-bold text-sm">MENU2</Typography>
            </MenuItem>
          </div>
          <div className="flex items-center">
            <Search>
              <SearchIconWrapper>
                <MdSearch size="1.3em" />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
            </Search>
            <IconButton className="ml-5 p-1.5">
              <Badge badgeContent={4} color="error">
                <MdOutlineNotificationsActive className="text-white" size="1.1em" />
              </Badge>
            </IconButton>
            <div className="ml-5">
              <AppHeaderAccountSetting />
            </div>
            <IconButton
              className="ml-3"
              aria-label="side-menu"
              onClick={() => dispatch(LayoutActions.setUI({ sidebarEndShow: !sidebarEndShow }))}
            >
              <MdVerticalSplit className="text-white" size="1.1em" />
            </IconButton>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AppHeader;
