import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

/**
 * get all posts
 */
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

/**
 * create a post
 */
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

/**
 * toggle a like on a post
 */
export const postLikeToggle = async (postID) => {
  try {
    const result = await axios.put(`${BASE_API_URL}/post/${postID}/like`, {}, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return result.data;
  } catch (e) {
    console.error('Error toggling like post', e);
    throw e;
  }
};

/**
 * fetch a post by ID
 */
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

/** 
 * create a comment on a post
 */
export const createComment = async (postID, formData) => {
  try {
    const { data } = await axios.post(`${BASE_API_URL}/post/${postID}/comment`, formData, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data;
  } catch (e) {
    console.error('Error posting comment', e);
    throw e;
  }
};

/**
 * toggle a like on a comment
 */
export const postCommentLikeToggle = async (postID, commentID) => {
  try {
    const result = await axios.put(`${BASE_API_URL}/post/${postID}/comment/${commentID}/like`, {}, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return result.data;
  } catch (e) {
    console.error('Error toggling like on a comment', e);
    throw e;
  }
};

/**
 * delete a comment on a post
 */
export const deleteComment = async (postID, commentID) => {
  try {
    const { data } = await axios.delete(`${BASE_API_URL}/post/${postID}/comment/${commentID}`, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data;
  } catch (e) {
    console.error('Error deleting comment', e);
    throw e;
  }
};

/**
 * update a comment
 */
export const updateComment = async (postID, commentID, formData) => {
  try {
    const { data } = await axios.put(`${BASE_API_URL}/post/${postID}/comment/${commentID}`, formData, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data;
  } catch (e) {
    console.error('Error updating comment', e);
    throw e;
  }
};

/**
 * update a post
 */
export const updatePost = async (postID, formData) => {
  try {
    const { data } = await axios.put(`${BASE_API_URL}/post/${postID}`, formData, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data;
  } catch (e) {
    console.error('Error updating post', e);
    throw e;
  }
};

/**
 * delete a post
 */
export const deletePost = async (postID) => {
  try {
    const { data } = await axios.delete(`${BASE_API_URL}/post/${postID}`, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data;
  } catch (e) {
    console.error('Error deleting post', e);
    throw e;
  }
};

/**
 * fetch the posts of a user
 */
export const fetchUserPosts = async (userID) => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/post/user/${userID}`, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data.data;
  } catch (e) {
    console.error('Error fetching user posts', e);
    throw e;
  }
};

/**
 * toggle a share on a post
 */
export const sharePostToggle = async (postID) => {
  try {
    const { data } = await axios.put(`${BASE_API_URL}/post/${postID}/share`, {}, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data;
  } catch (e) {
    console.error('Error sharing post', e);
    throw e;
  }
};
