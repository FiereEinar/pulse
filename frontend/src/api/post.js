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

export const createPost = async (formData) => {
  try {
    const { data } = await axios.post(`${BASE_API_URL}/post`, formData, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data;
  } catch (e) {
    console.error('Error creating post', e);
    throw e;
  }
};
