import useMemo from './useMemo';

export default function useCallback(stateManager, next = () => {}, state = []) {
  return useMemo(stateManager, () => next, state);
};
