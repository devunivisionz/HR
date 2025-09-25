import { apiEndpoints } from "../../api/endPoints/endPoints";
import { apiServices } from "../../api/apiCore/apiCore";
import { handleApi } from "../../api/apiHandler/apiHandler";

const { login, signup } = apiEndpoints;

const { get, post, update, deleteReq, postFormData } = apiServices;

export const registerApi = async ({ email, password, role, name }) => {
  try {
    const response = await handleApi(post, signup, {
      name,
      email,
      password,
      role,
    });
    return response;
  } catch (error) {
    return error; // or return a custom object if you prefer
  }
};

export const loginApi = async ({ email, password, role }) => {
  try {
    const response = await handleApi(post, login, {
      email,
      password,
    });
    return response;
  } catch (error) {
    return error; // or return a custom object if you prefer
  }
};
