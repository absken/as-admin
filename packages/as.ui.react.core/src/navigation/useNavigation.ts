import { useContext } from 'react';

import NavigationContext from './NavigationContext';

/**
 * @example
 *
 * import { useAppConfig } from 'app-name';
 *
 * const SamplePage = () => {
 *     const appNavigation = useAppNavigation();
 *
 *     return (
 *       <div><Sidebar navigation={appNavigation} /></div>
 *     )
 * }
 */
const useAppNavigation = () => useContext(NavigationContext);

export default useAppNavigation;
