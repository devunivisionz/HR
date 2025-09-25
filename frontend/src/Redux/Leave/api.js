import { apiEndpoints } from "../../api/endPoints/endPoints";
import { apiServices } from "../../api/apiCore/apiCore";
import { handleApi } from "../../api/apiHandler/apiHandler";

const { createLeave, getLeave, updateLeave } = apiEndpoints;

const { get, post, update, deleteReq, postFormData } = apiServices;

export const createLeaveApi = async (data) => {
  console.log("Raw form data:", data);

  // const formData = new FormData();
  // formData.append("designation", data.designation);
  // formData.append("leaveDate", data.leaveDate); // you must send this
  // formData.append("reason", data.reason);
  // formData.append("id", data.id);

  // documents must be a File object (from file input)
  // if (data.documents instanceof File) {
  // formData.append("document", data.document);
  // }

  try {
    const response = await handleApi(postFormData, `${createLeave}`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const getLeaveApi = async ({
  leaveDate = "",
  status = "",
  search = "",
}) => {
  try {
    let response;
    if (leaveDate) {
      // Convert to YYYY-MM-DD string
      const formattedDate = new Date(leaveDate).toISOString().split("T")[0]; // '2024-09-20'

      response = await handleApi(
        get,
        `${getLeave}?leaveDate=${formattedDate}&status=${status}&search=${search}`
      );
    } else {
      response = await handleApi(
        get,
        `${getLeave}?status=${status}&search=${search}`
      );
    }
    return response;
  } catch (error) {
    return error;
  }
};

export const updateLeaveApi = async ({ employeeId, status }) => {
  try {
    const response = await handleApi(update, `${updateLeave}/${employeeId}`, {
      status,
    });
    return response;
  } catch (error) {
    return error;
  }
};
