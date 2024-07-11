import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const getPosts = async () => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/post`, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data.data;
  } catch (e) {
    console.error('Error fetching posts', e);
    throw e;
  }
};