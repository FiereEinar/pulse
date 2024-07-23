import axiosInstance from "./axios";

/**
 * sign in
 */
export const postSignin = async (formData) => {
  try {
    const { data } = await axiosInstance.post(`/auth/signup`, formData);

    return data;
  } catch (e) {
    console.error('Error signing in', e);
    throw e;
  }
};

/**
 * log in
 */
export const postLogin = async (formData) => {
  try {
    const { data } = await axiosInstance.post(`/auth/login`, formData);

    return data;
  } catch (e) {
    console.error('Error logging in', e);
    throw e;
  }
};
