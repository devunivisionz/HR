// utils/handleApi.js

export const handleApi = async (apiFunc, ...args) => {
  try {
    const response = await apiFunc(...args); // handles flexible args
    return response;
  } catch (error) {
    throw error?.response?.data || { message: "Something went wrong" };
  }
};
