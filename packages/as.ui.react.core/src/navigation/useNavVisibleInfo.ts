import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as NavigationActions from './store/navigation.action';
import { CoreState } from '../core';

/**
 * Get Navigation visible info for Sidebar display
 * const SamplePage = () => {
 *     const { navActiveKey, setNavActiveKey, navVisibleGroup, setNavVisibleGroup } = useNavVisibleInfo();
 *     return (
 *     <PsTabContent>
 *       <PsTabPane visible={navActiveKey === 1}>
 *         <ParentMenu>
 *       </PsTabPane>
 *       <PsTabPane visible={navActiveKey === 2}>
 *         { navVisibleGroup === 'buttons' && (
 *            <>
 *               <ChildMenu1>
 *               <ChildMenu2>
 *             </>
 *          )}
 *         { navVisibleGroup === 'forms' && (
 *            <>
 *               <ChildMenu3>
 *               <ChildMenu4>
 *             </>
 *          )}
 *       </PsTabPane>
 *     </PsTabContent>
 *     );
 * };
 */
const useNavVisibleInfo = () => {
  const dispatch = useDispatch();

  const navVisibleGroup = useSelector((state: CoreState) => state.core.navigation.navVisibleGroup);
  const navActiveKey = useSelector((state: CoreState) => state.core.navigation.navActiveKey);

  const setNavVisibleGroup = useCallback(
    (navVisibleGroupInner) => {
      dispatch(NavigationActions.setNavVisibleGroupAction(navVisibleGroupInner));
    },
    [dispatch]
  );

  const setNavActiveKey = useCallback(
    (navActiveKeyInner) => {
      dispatch(NavigationActions.setNavActiveKeyAction(navActiveKeyInner));
    },
    [dispatch]
  );

  return { navVisibleGroup, setNavVisibleGroup, navActiveKey, setNavActiveKey };
};

export default useNavVisibleInfo;
