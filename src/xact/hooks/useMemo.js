export default function useMemo(stateManager, f = () => {}, state = []) {
  const sequence = stateManager.getSequence();
  let result;

  if (!stateManager.hasState(sequence)) {
    result = f();
    stateManager.setState(sequence, { state, result });
  } else {
    if (state.length) {
      if (stateManager.isChanged(sequence, state)) {
        result = f();
        // console.log('useMemo', sequence, stateManager.hasState(sequence), stateManager.getState(sequence)?.result, result);
        stateManager.setState(sequence, { state, result });
      } else {
        result = stateManager.getState(sequence).result;
      }
    } else {
      result = stateManager.getState(sequence).result;
    }
  }

  // console.log(sequence, 'result', result);

  stateManager.next();

  return result;
};
