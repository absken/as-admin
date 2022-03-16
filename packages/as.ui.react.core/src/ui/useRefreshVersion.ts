import { useSelector } from 'react-redux';

import { CoreState } from '../core';

/**
 * Get the UI version from the store
 *
 * The UI version is an integer incremented by the refresh button;
 * it serves to force running fetch hooks again.
 */
const useRefreshVersion = () => useSelector((state: CoreState) => state.core.ui.refreshVersion);

export default useRefreshVersion;
