export default function useMemo(stateManager, next = () => {}, state = []) {
  const sequence = stateManager.getSequence();
  let result = next();

  if (!stateManager.hasState(sequence)) {
    stateManager.setState(sequence, { state, result });
  } else {
    if (state.length) {
      if (stateManager.isChanged(sequence, state)) {
        stateManager.setState(sequence, { state, result });
      } else {
        result = stateManager.getState(sequence).result;
      }
    } else {
      result = stateManager.getState(sequence).result;
    }
  }
  stateManager.next();

  return result;
};
