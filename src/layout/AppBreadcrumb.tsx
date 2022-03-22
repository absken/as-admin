import React, { MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Breadcrumbs, Link, IconButton } from '@mui/material';
import { MdNavigateNext, MdRefresh } from 'react-icons/md';

import { useTranslate, useRefreshPage } from '@as/ui-react-core';

function AppBreadcrumb() {
  const dispatch = useDispatch();
  const refreshPage = useRefreshPage();
  const translate = useTranslate();
  // const breadcrumbs = useSelector((state) => state.core.breadcrumbs);

  const handleBreadcrumb = (evt: MouseEvent<HTMLElement>, path: string) => {
    evt.preventDefault();
    dispatch(push(path));
  };

  return (
    <div className="relative">
      <div
        className="app-breadcrumb fixed w-full z-10 pt-3 pb-4 px-4 bg-[#f9fafb]"
        role="presentation"
        onClick={(evt) => handleBreadcrumb(evt, '/')}
      >
        <Breadcrumbs
          separator={<MdNavigateNext size="1.2em" />}
          aria-label="breadcrumb"
          className="flex-1"
        >
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/getting-started/installation/">
            Dotos
          </Link>
          <Link
            underline="hover"
            className="text-secondary"
            href="/components/breadcrumbs/"
            aria-current="page"
          >
            Send Communication
          </Link>
        </Breadcrumbs>
      </div>
      <div className="fixed right-0 z-[11] pt-3 pr-4">
        <IconButton onClick={refreshPage} className="text-dark p-0" title="Refresh page">
          <MdRefresh size="1.1em" />
        </IconButton>
      </div>
    </div>
  );
}

export default React.memo(AppBreadcrumb);
