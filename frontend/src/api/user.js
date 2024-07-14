import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const fetchUserByID = async (userID) => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/user/${userID}`, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data.data;
  } catch (e) {
    console.error('Error fetching user', e);
    throw e;
  }
};

export const updateUser = async (userID, formData) => {
  try {
    const { data } = await axios.put(`${BASE_API_URL}/user/${userID}`, formData, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data;
  } catch (e) {
    console.error('Error updating user', e);
    throw e;
  }
};
