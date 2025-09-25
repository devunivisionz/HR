import { auth } from "./constant";

export const loginAction = (payload) => {
  return {
    type: auth.LOGIN,
    payload,
  };
};

export const registerAction = (payload) => {
  return {
    type: auth.REGISTER,
    payload,
  };
};

export const registerActionReset = (payload) => {
  return {
    type: auth.REGISTER_RESET,
    payload,
  };
};

export const loginActionReset = (payload) => {
  return {
    type: auth.LOGIN_RESET,
    payload,
  };
};
