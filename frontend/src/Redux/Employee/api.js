import { apiEndpoints } from "../../api/endPoints/endPoints";
import { apiServices } from "../../api/apiCore/apiCore";
import { handleApi } from "../../api/apiHandler/apiHandler";

const { getEmployee, updateEmployee, deleteEmployee } = apiEndpoints;

const { get, post, update, deleteReq, postFormData } = apiServices;

export const getEmployeeApi = async ({
  department = "",
  position = "",
  status = "",
  search = "",
}) => {
  try {
    const response = await handleApi(
      get,
      `${getEmployee}?department=${department}&position=${position}&leaveStatus=${status}&search=${search}`
    );
    return response;
  } catch (error) {
    return error; // or return a custom object if you prefer
  }
};

export const updateEmployeeApi = async ({ employeeId, ...data }) => {
  console.log(employeeId, "employeeId");
  let id;
  if (employeeId?._id) {
    id = employeeId?._id;
  } else {
    id = employeeId;
  }
  try {
    const response = await handleApi(update, `${updateEmployee}/${id}`, data);
    return response;
  } catch (error) {
    return error; // or return a custom object if you prefer
  }
};

export const deleteEmployeeApi = async ({ employeeId }) => {
  try {
    const response = await handleApi(
      deleteReq,
      `${deleteEmployee}/${employeeId}`
    );
    return response;
  } catch (error) {
    return error; // or return a custom object if you prefer
  }
};
