export default function useEffect(stateManager, next = () => {}, state = []) {
  const sequence = stateManager.getSequence();

  if (!stateManager.hasState(sequence)) {
    stateManager.setState(sequence, { next, state });
    next();
  } else {
    if (state.length) {
      if (stateManager.isChanged(sequence, state)) {
        stateManager.setState(sequence, { next, state });
        next();
      } else {
        stateManager.getState(sequence).next();
      }
    }
  }

  stateManager.next();
};
