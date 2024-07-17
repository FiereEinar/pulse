import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

/**
 * fetch a user by ID
 */
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

/**
 * update a user
 */
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

/**
 * update the cover photo of a user
 */
export const updateUserCover = async (userID, formData) => {
  try {
    const { data } = await axios.put(`${BASE_API_URL}/user/${userID}/cover`, formData, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data;
  } catch (e) {
    console.error('Error updating user cover photo', e);
    throw e;
  }
};

/**
 * fetch all users
 */
export const fetchUsers = async () => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/user`, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data.data;
  } catch (e) {
    console.error('Error fetching users', e);
    throw e;
  }
};

/**
 * fetch all activities of a user, notifications | friend requests
 */
export const fetchUserActivity = async (userID) => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/user/${userID}/activity`, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data.data;
  } catch (e) {
    console.error('Error fetching user activity', e);
    throw e;
  }
};

/**
 * update the 'seen' status of an activity/notification
 */
export const updateActivityStatus = async (userID, activityID, formData) => {
  try {
    const { data } = await axios.put(`${BASE_API_URL}/user/${userID}/activity/${activityID}`, formData, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data;
  } catch (e) {
    console.error('Error updating user activity', e);
    throw e;
  }
};

/**
 * send a friend request to a user
 */
export const sendFriendRequest = async (userID) => {
  try {
    const { data } = await axios.post(`${BASE_API_URL}/user/${userID}/request`, {}, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data;
  } catch (e) {
    console.error('Error sending friend request', e);
    throw e;
  }
};

/**
 * accept a friend request to a user
 */
export const acceptFriendRequest = async (userID) => {
  try {
    const { data } = await axios.post(`${BASE_API_URL}/user/${userID}/request/accept`, {}, {
      headers: {
        Authorization: localStorage.getItem('Token')
      }
    });

    return data;
  } catch (e) {
    console.error('Error accepting friend request', e);
    throw e;
  }
};
