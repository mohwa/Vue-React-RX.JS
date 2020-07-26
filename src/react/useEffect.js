import StateManager from '@react/stateManager';

export const stateManager = StateManager.factory();

export default function useEffect(next = () => {}, state = []) {
  const { sequence } = stateManager;

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

  ++stateManager.sequence;
};
