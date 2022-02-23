import { useContext } from 'react';

import ConfigContext from './ConfigContext';

/**
 * @example
 *
 * import { useAppConfig } from 'app-name';
 *
 * const LoginButton = () => {
 *     const appConfig = useAppConfig();
 *     return (
 *       <PsLink href="`${appConfig.app.projectUrl}/as-react-app-boilerplate`">
 *         Home
 *       </PsLink>
 *     )
 * }
 */
const useAppConfig = () => useContext(ConfigContext);

export default useAppConfig;
