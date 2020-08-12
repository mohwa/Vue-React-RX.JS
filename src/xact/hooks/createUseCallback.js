import createUseMemo from './createUseMemo';

export default function createUseCallback(stateManager) {
  const useMemo = createUseMemo(stateManager);

  return (f = () => {}, state = []) => {
    return useMemo(() => f, state);
  };
};
