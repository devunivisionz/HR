import { leave } from "./constant";

export const createLeaveAction = (payload) => {
  return {
    type: leave.CREATE_LEAVE,
    payload,
  };
};

export const createLeaveActionReset = (payload) => {
  return {
    type: leave.CREATE_LEAVE_RESET,
    payload,
  };
};

export const getLeaveAction = (payload) => {
  return {
    type: leave.GET_LEAVE,
    payload,
  };
};

export const getLeaveActionWithFilter = (payload) => {
  return {
    type: leave.GET_LEAVE_WITH_FILTER,
    payload,
  };
};

export const updateLeaveAction = (payload) => {
  return {
    type: leave.UPDATE_LEAVE,
    payload,
  };
};

export const updateLeaveActionReset = (payload) => {
  return {
    type: leave.UPDATE_LEAVE_RESET,
    payload,
  };
};
