import { useSelector } from 'react-redux';

/**
 * Get the loading status, i.e. a boolean indicating if at least one request is pending
 *
 *
 * @example
 *
 * import { useAppLoading } from 'app-name';
 *
 * const MyComponent = () => {
 *      const loading = useAppLoading();
 *      return loading ? <Skeleton /> : <RealContent>;
 * }
 */
// @ts-ignore
const useAppLoading = () => useSelector((state) => state.core.appLoading > 0);

export default useAppLoading;
