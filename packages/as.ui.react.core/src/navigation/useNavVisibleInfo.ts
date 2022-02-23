import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as NavigationActions from './store/navigation.action';
import { CoreReduxState } from '../types';

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

  const navVisibleGroup = useSelector(
    (state: CoreReduxState) => state.core.navigation.navVisibleGroup
  );
  const navActiveKey = useSelector((state: CoreReduxState) => state.core.navigation.navActiveKey);

  const setNavVisibleGroup = useCallback(
    (navVisibleGroup) => {
      dispatch(NavigationActions.setNavVisibleGroupAction(navVisibleGroup));
    },
    [dispatch]
  );

  const setNavActiveKey = useCallback(
    (navActiveKey) => {
      dispatch(NavigationActions.setNavActiveKeyAction(navActiveKey));
    },
    [dispatch]
  );

  return { navVisibleGroup, setNavVisibleGroup, navActiveKey, setNavActiveKey };
};

export default useNavVisibleInfo;
