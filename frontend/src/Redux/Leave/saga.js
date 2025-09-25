import { takeEvery, put, call, all, fork } from "redux-saga/effects";
import { leave } from "./constant";
import { createLeaveApi, getLeaveApi, updateLeaveApi } from "./api";

function* createLeaveSaga(action) {
  try {
    yield put({ type: leave.CREATE_LEAVE_LOADING });
    const payload = action.payload;
    console.log(action);
    const response = yield call(createLeaveApi, payload);
    if (response?.status == 201) {
      yield put({ type: leave.CREATE_LEAVE_SUCCESS, payload: response });
    } else {
      yield put({ type: leave.CREATE_LEAVE_ERROR, payload: response });
    }
  } catch (error) {
    yield put({
      type: leave.CREATE_LEAVE_ERROR,
      payload: error?.response,
    });
  }
}

function* getLeaveSaga(action) {
  try {
    yield put({ type: leave.GET_LEAVE_LOADING });
    const payload = action.payload;
    console.log(action);
    const response = yield call(getLeaveApi, payload);
    if (response?.status == 200) {
      yield put({ type: leave.GET_LEAVE_SUCCESS, payload: response });
    } else {
      yield put({ type: leave.GET_LEAVE_ERROR, payload: response });
    }
  } catch (error) {
    yield put({
      type: leave.GET_LEAVE_ERROR,
      payload: error?.response,
    });
  }
}

function* getLeaveWithFilterSaga(action) {
  try {
    yield put({ type: leave.GET_LEAVE_WITH_FILTER_LOADING });
    const payload = action.payload;
    console.log(action);
    const response = yield call(getLeaveApi, payload);
    if (response?.status == 200) {
      yield put({
        type: leave.GET_LEAVE_WITH_FILTER_SUCCESS,
        payload: response,
      });
    } else {
      yield put({ type: leave.GET_LEAVE_WITH_FILTER_ERROR, payload: response });
    }
  } catch (error) {
    yield put({
      type: leave.GET_LEAVE_WITH_FILTER_ERROR,
      payload: error?.response,
    });
  }
}

function* updateLeaveSaga(action) {
  try {
    yield put({ type: leave.UPDATE_LEAVE_LOADING });
    const payload = action.payload;
    const response = yield call(updateLeaveApi, payload);
    console.log(response);
    if (response?.status == 200) {
      yield put({ type: leave.UPDATE_LEAVE_SUCCESS, payload: response });
    } else {
      yield put({ type: leave.UPDATE_LEAVE_ERROR, payload: response });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: leave.UPDATE_LEAVE_ERROR,
      payload: error?.response,
    });
  }
}

function* createLeaveWatcher() {
  yield takeEvery(leave.CREATE_LEAVE, createLeaveSaga);
}

function* getLeaveWatcher() {
  yield takeEvery(leave.GET_LEAVE, getLeaveSaga);
}

function* updateLeaveWatcher() {
  yield takeEvery(leave.UPDATE_LEAVE, updateLeaveSaga);
}

function* getLeaveWithFilterWatcher() {
  yield takeEvery(leave.GET_LEAVE_WITH_FILTER, getLeaveWithFilterSaga);
}

export default function* leaveSaga() {
  yield all([
    fork(createLeaveWatcher),
    fork(getLeaveWatcher),
    fork(updateLeaveWatcher),
    fork(getLeaveWithFilterWatcher),
  ]);
}
