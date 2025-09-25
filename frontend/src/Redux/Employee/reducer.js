import { employee } from "./constant";

const initialState = {
  data: [],
  loading: false,
};

export const getEmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case employee.GET_EMPLOYEE_LOADING:
      return {
        ...state,
        loading: true,
      };

    case employee.GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case employee.GET_EMPLOYEE_ERROR:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case employee.GET_EMPLOYEE_RESET:
      return initialState;

    default:
      return state;
  }
};

export const updateEmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case employee.UPDATE_EMPLOYEE_LOADING:
      return {
        ...state,
        loading: true,
      };

    case employee.UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case employee.UPDATE_EMPLOYEE_ERROR:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case employee.UPDATE_EMPLOYEE_RESET:
      return initialState;

    default:
      return state;
  }
};

export const deleteEmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case employee.DELETE_EMPLOYEE_LOADING:
      return {
        ...state,
        loading: true,
      };

    case employee.DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case employee.DELETE_EMPLOYEE_ERROR:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case employee.DELETE_EMPLOYEE_RESET:
      return initialState;

    default:
      return state;
  }
};
