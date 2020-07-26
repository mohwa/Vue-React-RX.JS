export default class StateManager {
  sequence = 0;
  stateMap = new Map();
  static factory() {
    return new StateManager();
  }
  hasState(k){
    return this.stateMap.has(k);
  }
  getState(k){
    return this.stateMap.get(k);
  }
  setState(k, v){
    return this.stateMap.set(k, v);
  }
  isChanged(k, state) {
    const { state: prevState } = this.getState(k);

    return prevState.some((v, i) => v !== state[i]);
  }
  dispose(){
    this.sequence = 0;
  }
}
