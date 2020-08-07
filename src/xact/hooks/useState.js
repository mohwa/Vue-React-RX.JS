export default function useState(stateManager, subject, defaultValue) {
  const sequence = stateManager.getSequence();
  let value;

  const setValue = (newValue) => {
    const compareValue = stateManager.getState(sequence);

    if (newValue !== compareValue) {
      stateManager.setState(sequence, newValue);

      setTimeout(() => {
        stateManager.dispose();

        console.log('replaceDom');
        subject.next();
      });
    }
  };

  if (!stateManager.hasState(sequence)) {
    value = defaultValue;
    stateManager.setState(sequence, value);
  } else {
    value = stateManager.getState(sequence);
  }

  stateManager.next();

  return [value, setValue];
};
