import { takeEvery, put, call, all, fork } from "redux-saga/effects";
import { auth } from "./constant";
import { registerApi, loginApi } from "./api";

function* registerSaga(action) {
  try {
    yield put({ type: auth.REGISTER_LOADING });
    const { name, email, password, role } = action.payload;
    const response = yield call(registerApi, {
      name,
      email,
      password,
      role,
    });
    if (response?.status == 200) {
      yield put({ type: auth.REGISTER_SUCCESS, payload: response });
    } else {
      yield put({ type: auth.REGISTER_ERROR, payload: response });
    }
  } catch (error) {
    yield put({
      type: auth.REGISTER_ERROR,
      payload: error?.response,
    });
  }
}

function* loginSaga(action) {
  try {
    yield put({ type: auth.LOGIN_LOADING });
    const { email, password } = action.payload;
    const response = yield call(loginApi, {
      email,
      password,
    });
    if (response?.status == 200) {
      yield put({ type: auth.LOGIN_SUCCESS, payload: response });
    } else {
      yield put({ type: auth.LOGIN_ERROR, payload: response });
    }
  } catch (error) {
    yield put({
      type: auth.LOGIN_ERROR,
      payload: error?.response,
    });
  }
}

function* registerWatcher() {
  yield takeEvery(auth.REGISTER, registerSaga);
}

function* loginWatcher() {
  yield takeEvery(auth.LOGIN, loginSaga);
}

export default function* authSaga() {
  yield all([fork(registerWatcher), fork(loginWatcher)]);
}
