import Store from '../store';
import createUseMemo from './createUseMemo';

export default function createUseSelector(stateManager) {
  const useMemo = createUseMemo(stateManager);

  return (f = () => {}) => {
    return useMemo(f.bind(null, Store.getState()), [f(Store.getState())]);
  };
};
