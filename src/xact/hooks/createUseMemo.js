export default function createUseMemo(stateManager) {
  return (f = () => {}, state = []) => {
    const sequence = stateManager.getSequence();
    let result;

    if (!stateManager.hasState(sequence)) {
      result = f();
      stateManager.setState(sequence, {state, result});
    } else {
      if (state.length) {
        if (stateManager.isChanged(sequence, state)) {
          result = f();
          // console.log('useMemo, isChanged', sequence, result);
          stateManager.setState(sequence, {state, result});
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
};
