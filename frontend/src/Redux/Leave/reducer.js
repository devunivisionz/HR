import { leave } from "./constant";

const initialState = {
  data: [],
  loading: false,
};

export const createLeaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case leave.CREATE_LEAVE_LOADING:
      return {
        ...state,
        loading: true,
      };

    case leave.CREATE_LEAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case leave.CREATE_LEAVE_ERROR:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case leave.CREATE_LEAVE_RESET:
      return initialState;

    default:
      return state;
  }
};

export const getLeaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case leave.GET_LEAVE_LOADING:
      return {
        ...state,
        loading: true,
      };

    case leave.GET_LEAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case leave.GET_LEAVE_ERROR:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case leave.GET_LEAVE_RESET:
      return initialState;

    default:
      return state;
  }
};

export const getLeaveReducerWithFilter = (state = initialState, action) => {
  switch (action.type) {
    case leave.GET_LEAVE_WITH_FILTER_LOADING:
      return {
        ...state,
        loading: true,
      };

    case leave.GET_LEAVE_WITH_FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case leave.GET_LEAVE_WITH_FILTER_ERROR:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case leave.GET_LEAVE_WITH_FILTER_RESET:
      return initialState;

    default:
      return state;
  }
};

export const updateLeaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case leave.UPDATE_LEAVE_LOADING:
      return {
        ...state,
        loading: true,
      };

    case leave.UPDATE_LEAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case leave.UPDATE_LEAVE_ERROR:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case leave.UPDATE_LEAVE_RESET:
      return initialState;

    default:
      return state;
  }
};
