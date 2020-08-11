import aActions from '../actions/aActions';
import { createReducer } from "@xact/reducers/reducerHelpers";

const initialState = {
  x: 1,
  y: 2,
};

export default createReducer(initialState, {
  [aActions.SET_X](state, action) {
    return {
      ...initialState,
      x: action.payload,
    };
  },
  [aActions.SET_Y](state, action) {
    console.log(state, action);

    return {
      ...initialState,
      y: action.payload,
    };
  },
});
