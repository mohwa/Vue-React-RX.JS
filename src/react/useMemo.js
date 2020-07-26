import StateManager from "@react/stateManager";

export const stateManager = StateManager.factory();

export default function useMemo(next = () => {}, state = []) {
  const { sequence } = stateManager;
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
  ++stateManager.sequence;

  return result;
};
