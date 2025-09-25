import { candidate } from "./constant";

export const addCandidateAction = (payload) => {
  return {
    type: candidate.ADD_CANDIDATE,
    payload,
  };
};
export const addCandidateActionReset = (payload) => {
  return {
    type: candidate.ADD_CANDIDATE_RESET,
    payload,
  };
};
export const getCandidateAction = (payload) => {
  return {
    type: candidate.GET_CANDIDATE,
    payload,
  };
};
export const updateCandidateAction = (payload) => {
  return {
    type: candidate.UPDATE_CANDIDATE,
    payload,
  };
};
export const updateCandidateActionReset = (payload) => {
  return {
    type: candidate.UPDATE_CANDIDATE_RESET,
    payload,
  };
};
export const deleteCandidateAction = (payload) => {
  return {
    type: candidate.DELETE_CANDIDATE,
    payload,
  };
};
export const deleteCandidateActionReset = (payload) => {
  return {
    type: candidate.DELETE_CANDIDATE_RESET,
    payload,
  };
};
