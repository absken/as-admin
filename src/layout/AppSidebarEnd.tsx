import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SimpleBarReact from 'simplebar-react';
import { BsX } from 'react-icons/bs';
import { Tabs, Tab, Typography, Box, IconButton } from '@mui/material';
import { CoreState } from '@as/ui-react-core';

import { AsSidebar, AsSidebarNav } from '../components';
import * as LayoutActions from './store/layout.action';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function AppSidebarEnd() {
  const dispatch = useDispatch();
  const sidebarEndShow = useSelector((state: CoreState) => state.layout.sidebarEndShow);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <AsSidebar
      position="end"
      overlaid={Boolean(true)}
      visible={sidebarEndShow}
      onVisibleChange={(visible) => {
        dispatch(LayoutActions.setUI({ sidebarEndShow: visible }));
      }}
      className="bg-white"
    >
      <div className="flex-[0_0_4rem] bg-white">
        <div className="w-full">
          <div className="border-b border-b-gray-300">
            <IconButton
              aria-label="Example"
              className="absolute top-0 right-0 text-gray-800 z-10"
              onClick={() => dispatch(LayoutActions.setUI({ sidebarEndShow: !sidebarEndShow }))}
            >
              <BsX size="1.5rem" />
            </IconButton>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              className="mt-2"
              aria-label="basic tabs example"
            >
              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
          </div>
        </div>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </div>
    </AsSidebar>
  );
}

export default React.memo(AppSidebarEnd);
