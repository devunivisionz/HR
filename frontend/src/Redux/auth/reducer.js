import { auth } from "./constant";

const initialState = {
  data: [],
  loading: false,
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case auth.REGISTER_LOADING:
      return {
        ...state,
        loading: true,
      };

    case auth.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case auth.REGISTER_ERROR:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case auth.REGISTER_RESET:
      return initialState;

    default:
      return state;
  }
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case auth.LOGIN_LOADING:
      return {
        ...state,
        loading: true,
      };

    case auth.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case auth.LOGIN_ERROR:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case auth.LOGIN_RESET:
      return initialState;

    default:
      return state;
  }
};
