import { apiEndpoints } from "../../api/endPoints/endPoints";
import { apiServices } from "../../api/apiCore/apiCore";
import { handleApi } from "../../api/apiHandler/apiHandler";

const { createCandidate, getCandidate, updateStatus, deleteCandidate } =
  apiEndpoints;

const { get, post, update, deleteReq, postFormData } = apiServices;

export const createCandidateApi = async ({
  name,
  email,
  phone,
  position,
  experience,
  resume,
}) => {
  try {
    const response = await handleApi(postFormData, createCandidate, {
      name,
      email,
      phone,
      position,
      experience,
      resume,
    });
    return response;
  } catch (error) {
    return error; // or return a custom object if you prefer
  }
};

export const getCandidateApi = async ({ status, position, search }) => {
  try {
    const response = await handleApi(
      get,
      `${getCandidate}?status=${status}&position=${position}&search=${search}`
    );
    return response;
  } catch (error) {
    return error; // or return a custom object if you prefer
  }
};

export const updateCandidateApi = async ({ status, candidateId }) => {
  try {
    const response = await handleApi(update, updateStatus, {
      status,
      candidateId,
    });
    return response;
  } catch (error) {
    return error; // or return a custom object if you prefer
  }
};

export const deleteCandidateApi = async ({ id }) => {
  try {
    const response = await handleApi(deleteReq, `${deleteCandidate}/${id}`);
    return response;
  } catch (error) {
    return error; // or return a custom object if you prefer
  }
};
