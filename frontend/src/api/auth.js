import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const postSignin = async (formData) => {
  try {
    const { data } = await axios.post(`${BASE_API_URL}/auth/signup`, formData);

    return data;
  } catch (e) {
    console.error('Error signing in', e);
    throw e;
  }
};

export const postLogin = async (formData) => {
  try {
    const { data } = await axios.post(`${BASE_API_URL}/auth/login`, formData);

    return data;
  } catch (e) {
    console.error('Error logging in', e);
    throw e;
  }
};
