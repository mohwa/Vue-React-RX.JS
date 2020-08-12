import bActions from '../actions/bActions';
import { createReducer } from "@xact/reducers/reducerHelpers";

const initialState = {
  x: 1,
  y: 2,
};

export default createReducer(initialState, {
  [bActions.SET_X](state, actions) {
    return {
      ...initialState,
      x: actions.payload,
    }
  },
  [bActions.SET_Y](state, actions) {
    return {
      ...initialState,
      y: actions.payload,
    }
  },
});
