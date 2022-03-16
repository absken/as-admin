import { useSelector } from 'react-redux';

import { CoreState } from '../core';

/**
 * Get current theme type(ex. 'light' or 'dark') from the store
 *
 */
const useThemeType = () => useSelector((state: CoreState) => state.core.ui.themeType);

export default useThemeType;
