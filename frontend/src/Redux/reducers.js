import { loginReducer, registerReducer } from "./auth/reducer";
import {
  createCandidateReducer,
  deleteCandidateReducer,
  getCandidateReducer,
  updateCandidateReducer,
} from "./Candidate/reducer";
import {
  deleteEmployeeReducer,
  getEmployeeReducer,
  updateEmployeeReducer,
} from "./Employee/reducer";
import {
  createLeaveReducer,
  getLeaveReducer,
  getLeaveReducerWithFilter,
  updateLeaveReducer,
} from "./Leave/reducer";

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};

export const rootReducer = combineReducers({
  createCandidateReducer,
  registerReducer,
  loginReducer,
  getCandidateReducer,
  updateCandidateReducer,
  getEmployeeReducer,
  deleteCandidateReducer,
  updateEmployeeReducer,
  deleteEmployeeReducer,
  createLeaveReducer,
  getLeaveReducer,
  updateLeaveReducer,
  getLeaveReducerWithFilter,
});
