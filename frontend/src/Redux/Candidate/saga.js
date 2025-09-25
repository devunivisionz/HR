import { takeEvery, put, call, all, fork } from "redux-saga/effects";
import { candidate } from "./constant";
import {
  createCandidateApi,
  deleteCandidateApi,
  getCandidateApi,
  updateCandidateApi,
} from "./api";

function* createCandidateSaga(action) {
  try {
    yield put({ type: candidate.ADD_CANDIDATE_LOADING });
    const { name, email, phone, position, experience, resume } = action.payload;
    const response = yield call(createCandidateApi, {
      name,
      email,
      phone,
      position,
      experience,
      resume,
    });
    if (response?.status == 200) {
      yield put({ type: candidate.ADD_CANDIDATE_SUCCESS, payload: response });
    } else {
      yield put({ type: candidate.ADD_CANDIDATE_ERROR, payload: response });
    }
  } catch (error) {
    console.log(error, action);

    yield put({
      type: candidate.ADD_CANDIDATE_ERROR,
      payload: error?.response,
    });
  }
}

function* getCandidateSaga(action) {
  try {
    yield put({ type: candidate.GET_CANDIDATE_LOADING });
    const { status, position, search } = action.payload;
    const response = yield call(getCandidateApi, {
      status,
      position,
      search,
    });
    if (response?.status == 200) {
      yield put({ type: candidate.GET_CANDIDATE_SUCCESS, payload: response });
    } else {
      yield put({ type: candidate.GET_CANDIDATE_ERROR, payload: response });
    }
  } catch (error) {
    console.log(error, action);

    yield put({
      type: candidate.GET_CANDIDATE_ERROR,
      payload: error?.response,
    });
  }
}

function* updateCandidateSaga(action) {
  try {
    yield put({ type: candidate.UPDATE_CANDIDATE_LOADING });
    const { status, candidateId } = action.payload;
    const response = yield call(updateCandidateApi, {
      status,
      candidateId,
    });
    if (response?.status == 200) {
      yield put({
        type: candidate.UPDATE_CANDIDATE_SUCCESS,
        payload: response,
      });
    } else {
      yield put({ type: candidate.UPDATE_CANDIDATE_ERROR, payload: response });
    }
  } catch (error) {
    console.log(error, action);

    yield put({
      type: candidate.UPDATE_CANDIDATE_ERROR,
      payload: error?.response,
    });
  }
}

function* deleteCandidateSaga(action) {
  try {
    yield put({ type: candidate.DELETE_CANDIDATE_LOADING });
    const { id } = action.payload;
    const response = yield call(deleteCandidateApi, {
      id,
    });
    if (response?.status == 200) {
      yield put({
        type: candidate.DELETE_CANDIDATE_SUCCESS,
        payload: response,
      });
    } else {
      yield put({ type: candidate.DELETE_CANDIDATE_ERROR, payload: response });
    }
  } catch (error) {
    yield put({
      type: candidate.DELETE_CANDIDATE_ERROR,
      payload: error?.response,
    });
  }
}

function* createCandidateWatcher() {
  yield takeEvery(candidate.ADD_CANDIDATE, createCandidateSaga);
}

function* getCandidateWatcher() {
  yield takeEvery(candidate.GET_CANDIDATE, getCandidateSaga);
}

function* updateCandidateWatcher() {
  yield takeEvery(candidate.UPDATE_CANDIDATE, updateCandidateSaga);
}

function* deleteCandidateWatcher() {
  yield takeEvery(candidate.DELETE_CANDIDATE, deleteCandidateSaga);
}

export default function* candidateSaga() {
  yield all([
    fork(createCandidateWatcher),
    fork(getCandidateWatcher),
    fork(deleteCandidateWatcher),
    fork(updateCandidateWatcher),
  ]);
}
