// Combines all sagas into a single saga middleware
import { all } from "redux-saga/effects";
import candidateSaga from "./Candidate/saga";
import authSaga from "./auth/saga";
import employeeSaga from "./Employee/saga";
import leaveSaga from "./Leave/saga";

export default function* rootSaga() {
  yield all([candidateSaga(), authSaga(), employeeSaga(), leaveSaga()]);
}
