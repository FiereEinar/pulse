import axiosInstance from "./axios";

/**
 * fetch a user by ID
 */
export const fetchUserByID = async (userID) => {
  try {
    const { data } = await axiosInstance.get(`/user/${userID}`);

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
    const { data } = await axiosInstance.put(`/user/${userID}`, formData);

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
    const { data } = await axiosInstance.put(`/user/${userID}/cover`, formData);

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
    const { data } = await axiosInstance.get(`/user`);

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
    const { data } = await axiosInstance.get(`/user/${userID}/activity`);

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
    const { data } = await axiosInstance.put(`/user/${userID}/activity/${activityID}`, formData);

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
    const { data } = await axiosInstance.post(`/user/${userID}/request`, {});

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
    const { data } = await axiosInstance.post(`/user/${userID}/request/accept`, {});

    return data;
  } catch (e) {
    console.error('Error accepting friend request', e);
    throw e;
  }
};
