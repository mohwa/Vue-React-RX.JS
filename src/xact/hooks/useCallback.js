import useMemo from '@react/useMemo';

export default function useCallback(stateManager, next = () => {}, state = []) {
  return useMemo(stateManager, () => next, state);
};
