import React, { MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Breadcrumbs, Link } from '@mui/material';
import { MdNavigateNext } from 'react-icons/md';

import { useTranslate } from '@as/ui-react-core';

function AppBreadcrumb() {
  const dispatch = useDispatch();
  const translate = useTranslate();
  // const breadcrumbs = useSelector((state) => state.core.breadcrumbs);

  const handleBreadcrumb = (evt: MouseEvent<HTMLElement>, path: string) => {
    evt.preventDefault();
    dispatch(push(path));
  };

  return (
    <div
      className="pt-2 pb-4 px-4"
      role="presentation"
      onClick={(evt) => handleBreadcrumb(evt, '/')}
    >
      <Breadcrumbs separator={<MdNavigateNext size="1.2em" />} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/getting-started/installation/">
          Dotos
        </Link>
        <Link
          underline="hover"
          className="text-primary"
          href="/components/breadcrumbs/"
          aria-current="page"
        >
          Send Communication
        </Link>
      </Breadcrumbs>
    </div>
  );
}

export default React.memo(AppBreadcrumb);
