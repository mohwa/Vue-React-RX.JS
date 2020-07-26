import useMemo from '@react/useMemo';

export default function useCallback(next = () => {}, state = []) {
  return useMemo(() => next, state);
};
