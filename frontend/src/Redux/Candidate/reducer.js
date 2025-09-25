import { candidate } from "./constant";

const initialState = {
  data: [],
  loading: false,
};

export const createCandidateReducer = (state = initialState, action) => {
  switch (action.type) {
    case candidate.ADD_CANDIDATE_LOADING:
      return {
        ...state,
        loading: true,
      };

    case candidate.ADD_CANDIDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case candidate.ADD_CANDIDATE_ERROR:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case candidate.ADD_CANDIDATE_RESET:
      return initialState;

    default:
      return state;
  }
};

export const getCandidateReducer = (state = initialState, action) => {
  switch (action.type) {
    case candidate.GET_CANDIDATE_LOADING:
      return {
        ...state,
        loading: true,
      };

    case candidate.GET_CANDIDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case candidate.GET_CANDIDATE_ERROR:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case candidate.GET_CANDIDATE_RESET:
      return initialState;

    default:
      return state;
  }
};

export const updateCandidateReducer = (state = initialState, action) => {
  switch (action.type) {
    case candidate.UPDATE_CANDIDATE_LOADING:
      return {
        ...state,
        loading: true,
      };

    case candidate.UPDATE_CANDIDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case candidate.UPDATE_CANDIDATE_ERROR:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case candidate.UPDATE_CANDIDATE_RESET:
      return initialState;

    default:
      return state;
  }
};

export const deleteCandidateReducer = (state = initialState, action) => {
  switch (action.type) {
    case candidate.DELETE_CANDIDATE_LOADING:
      return {
        ...state,
        loading: true,
      };

    case candidate.DELETE_CANDIDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case candidate.DELETE_CANDIDATE_ERROR:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case candidate.DELETE_CANDIDATE_RESET:
      return initialState;

    default:
      return state;
  }
};
