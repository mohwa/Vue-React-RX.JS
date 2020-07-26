import { stateManager as effectManager } from '@react/useEffect';
import { stateManager as memoManager }  from '@react/useMemo';
import { stateManager as callbackManager }  from '@react/useCallback';
import StateManager from "@react/stateManager";

export const stateManager = StateManager.factory();

export default function useState(defaultValue, component) {
  const { sequence } = stateManager;
  let value;

  const setValue = (newValue) => {
    const compareValue = stateManager.getState(sequence);

    if (newValue !== compareValue) {
      stateManager.setState(sequence, newValue);

      setTimeout(() => {
        stateManager.dispose();
        effectManager.dispose();
        memoManager.dispose();

        component();
      });
    }
  };

  if (!stateManager.hasState(sequence)) {
    value = defaultValue;
    stateManager.setState(sequence, value);
  } else {
    value = stateManager.getState(sequence);
  }

  ++stateManager.sequence;

  return [value, setValue];
};
