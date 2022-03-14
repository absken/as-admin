import React, { MouseEvent, useState } from 'react';
import { Tooltip, Menu, IconButton, MenuItem, ListItemIcon, Divider, Fab } from '@mui/material';
import { MdPersonAdd, MdSettings, MdLogout } from 'react-icons/md';

import { useLogout } from '@as/ui-react-core';
import avatar8 from './../../assets/images/avatars/8.jpg';

function AppHeaderAccountSetting() {
  const logout = useLogout();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (evt: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(evt.currentTarget as any);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Account settings">
        <Fab
          className="shadow-sm hover:bg-body w-8 h-8 min-h-[30px] bg-white text-secondary font-extrabold"
          aria-label="add"
          onClick={handleClick}
        >
          KK
        </Fab>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <MdPersonAdd fontSize="large" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <MdSettings fontSize="large" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={() => logout({}, undefined, false)}>
          <ListItemIcon>
            <MdLogout fontSize="large" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default AppHeaderAccountSetting;
