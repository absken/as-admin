import { useSelector } from 'react-redux';

import { CoreReduxState } from '../types';

/**
 * Get the UI version from the store
 *
 * The UI version is an integer incremented by the refresh button;
 * it serves to force running fetch hooks again.
 */
const useRefreshVersion = () =>
  useSelector((state: CoreReduxState) => state.core.ui.refreshVersion);

export default useRefreshVersion;
