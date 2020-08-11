import Store from '../store';
import useMemo from './useMemo';

export default function useSelector(stateManager, next) {
  return useMemo(stateManager, next.bind(null, Store.getState()), [next(Store.getState())]);
};
