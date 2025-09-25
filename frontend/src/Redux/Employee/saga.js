import { takeEvery, put, call, all, fork } from "redux-saga/effects";
import { employee } from "./constant";
import { deleteEmployeeApi, getEmployeeApi, updateEmployeeApi } from "./api";

function* getEmployeeSaga(action) {
  try {
    yield put({ type: employee.GET_EMPLOYEE_LOADING });
    const payload = action.payload;
    const response = yield call(getEmployeeApi, payload);
    if (response?.status == 200) {
      yield put({ type: employee.GET_EMPLOYEE_SUCCESS, payload: response });
    } else {
      yield put({ type: employee.GET_EMPLOYEE_ERROR, payload: response });
    }
  } catch (error) {
    yield put({
      type: employee.GET_EMPLOYEE_ERROR,
      payload: error?.response,
    });
  }
}

function* updateEmployeeSaga(action) {
  try {
    yield put({ type: employee.UPDATE_EMPLOYEE_LOADING });
    const payload = action.payload;
    console.log(payload);
    const response = yield call(updateEmployeeApi, {
      ...payload,
      employeeId: payload?.employeeId,
    });
    if (response?.status == 200) {
      yield put({ type: employee.UPDATE_EMPLOYEE_SUCCESS, payload: response });
    } else {
      yield put({ type: employee.UPDATE_EMPLOYEE_ERROR, payload: response });
    }
  } catch (error) {
    yield put({
      type: employee.UPDATE_EMPLOYEE_ERROR,
      payload: error?.response,
    });
  }
}

function* deleteEmployeeSaga(action) {
  try {
    yield put({ type: employee.DELETE_EMPLOYEE_LOADING });
    const { employeeId } = action.payload;
    const response = yield call(deleteEmployeeApi, {
      employeeId,
    });
    if (response?.status == 200) {
      yield put({ type: employee.DELETE_EMPLOYEE_SUCCESS, payload: response });
    } else {
      yield put({ type: employee.DELETE_EMPLOYEE_ERROR, payload: response });
    }
  } catch (error) {
    yield put({
      type: employee.DELETE_EMPLOYEE_ERROR,
      payload: error?.response,
    });
  }
}

function* getEmployeeWatcher() {
  yield takeEvery(employee.GET_EMPLOYEE, getEmployeeSaga);
}

function* updateEmployeeWatcher() {
  yield takeEvery(employee.UPDATE_EMPLOYEE, updateEmployeeSaga);
}

function* deleteEmployeeWatcher() {
  yield takeEvery(employee.DELETE_EMPLOYEE, deleteEmployeeSaga);
}

export default function* employeeSaga() {
  yield all([
    fork(getEmployeeWatcher),
    fork(updateEmployeeWatcher),
    fork(deleteEmployeeWatcher),
  ]);
}
