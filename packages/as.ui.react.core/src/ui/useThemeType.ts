import { useSelector } from 'react-redux';

import { CoreReduxState } from '../types';

/**
 * Get current theme type(ex. 'light' or 'dark') from the store
 *
 */
const useThemeType = () =>
  useSelector((state: CoreReduxState) => state.core.ui.themeType);

export default useThemeType;
