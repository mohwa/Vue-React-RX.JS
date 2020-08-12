export default function createUseEffect(stateManager) {
  return (f = () => {}, state = []) => {
    const sequence = stateManager.getSequence();

    if (!stateManager.hasState(sequence)) {
      stateManager.setState(sequence, {f, state});
      f();
    } else {
      if (state.length) {
        if (stateManager.isChanged(sequence, state)) {
          stateManager.setState(sequence, {f, state});
          f();
        }
      }
    }
    stateManager.next();
  };
};
