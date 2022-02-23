import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as UiActions from './store/ui.action';
import { useTranslate } from '../i18n';

const useAutosetPageTitle = (key: string) => {
  const dispatch = useDispatch();
  const translate = useTranslate();

  useEffect(() => {
    dispatch(UiActions.setPageTitleAction(translate(key)));
  }, [key, translate, dispatch]);
};

export default useAutosetPageTitle;
