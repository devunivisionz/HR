import { employee } from "./constant";

export const getEmployeeAction = (payload) => {
  return {
    type: employee.GET_EMPLOYEE,
    payload,
  };
};

export const updateEmployeeAction = (payload) => {
  return {
    type: employee.UPDATE_EMPLOYEE,
    payload,
  };
};

export const updateEmployeeActionReset = (payload) => {
  return {
    type: employee.UPDATE_EMPLOYEE_RESET,
    payload,
  };
};

export const deleteEmployeeAction = (payload) => {
  return {
    type: employee.DELETE_EMPLOYEE,
    payload,
  };
};

export const deleteEmployeeActionReset = (payload) => {
  return {
    type: employee.DELETE_EMPLOYEE_RESET,
    payload,
  };
};
