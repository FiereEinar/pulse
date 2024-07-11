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

export const togglePostLike = async (postID, userID, isCurrentlyLiked) => {
  try {
    let result = null;

    if (isCurrentlyLiked) {
      result = await axios.delete(`${BASE_API_URL}/post/${postID}/${userID}/like`, {
        headers: {
          Authorization: localStorage.getItem('Token')
        }
      });
    } else {
      result = await axios.post(`${BASE_API_URL}/post/${postID}/${userID}/like`, {}, {
        headers: {
          Authorization: localStorage.getItem('Token')
        }
      });
    }

    return result.data;
  } catch (e) {
    console.error('Error toggling like post', e);
    throw e;
  }
};

export const fetchPostByID = async (postID) => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/post/${postID}`, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data.data;
  } catch (e) {
    console.error('Error fetching post', e);
    throw e;
  }
};