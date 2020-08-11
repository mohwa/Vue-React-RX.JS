export default function useState(stateManager, subject, defaultValue) {
  const sequence = stateManager.getSequence();
  let value;

  const setValue = (newValue) => {
    const compareValue = stateManager.getState(sequence);
    console.log('compareValue', sequence, compareValue, newValue);

    if (newValue !== compareValue) {
      console.log('setState', sequence, newValue);
      stateManager.setState(sequence, newValue);

      setTimeout(() => {
        console.log('replaceDom');

        stateManager.dispose();
        subject.next();
      });
    }
  };

  if (!stateManager.hasState(sequence)) {
    value = defaultValue;
    stateManager.setState(sequence, value);
  } else {
    value = stateManager.getState(sequence);
    // console.log(sequence, value);
  }
  stateManager.next();

  return [value, setValue];
};
