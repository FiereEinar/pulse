const asyncHandler = require('express-async-handler');
const Response = require('../utils/response');
const User = require('../models/user');
const { serverlessImageUpload } = require('../utils/uploader');
const cloudinary = require('../utils/cloudinary');
const Activity = require('../models/activity');

/**
 * GET USER BY ID
 */
exports.user_get = asyncHandler(async (req, res) => {
  const { userID } = req.params;

  const user = await User.findById(userID, '-password')
    .populate({
      path: 'friends',
      select: '-password'
    })
    .populate({
      path: 'friendRequests',
      select: '-password'
    })
    .exec();

  res.json(new Response(true, user, 'User data gathered', null));
});

/**
 * GET USERS
 */
exports.users_get = asyncHandler(async (req, res) => {
  const users = await User.find({}, '-password').exec();

  res.json(new Response(true, users, 'Users gathered', null));
});

/**
 * UPDATE USER
 */
exports.user_update = asyncHandler(async (req, res) => {
  const { userID } = req.params;
  const { firstname, lastname, username, bio } = req.body;

  const user = await User.findById(userID);
  if (!user) {
    return res.status(404).json(new Response(false, null, 'User not found', null));
  }

  let imageUrl = user.profile.url;
  let imagePublicID = user.profile.publicID;

  if (req.file) {
    const result = await serverlessImageUpload(req.file.buffer, 'profiles');

    imageUrl = result.secure_url;
    imagePublicID = result.public_id;

    if (user.profile.publicID) {
      await cloudinary.uploader.destroy(user.profile.publicID);
    }
  }

  const update = {
    firstname: firstname,
    lastname: lastname,
    username: username,
    bio: bio,
    profile: {
      url: imageUrl,
      publicID: imagePublicID
    },
  };

  const result = await User.findByIdAndUpdate(userID, update, { new: true }).exec();

  res.json(new Response(true, result, 'User updated', null));
});

/**
 * UPDATE USER COVER PHOTO
 */
exports.user_update_cover = asyncHandler(async (req, res) => {
  const { userID } = req.params;

  const user = await User.findById(userID);
  if (!user) {
    return res.status(404).json(new Response(false, null, 'User not found', null));
  }

  let imageUrl = user.cover.url;
  let imagePublicID = user.cover.publicID;

  if (req.file) {
    const result = await serverlessImageUpload(req.file.buffer, 'covers');

    imageUrl = result.secure_url;
    imagePublicID = result.public_id;

    if (user.cover.publicID) {
      await cloudinary.uploader.destroy(user.cover.publicID);
    }
  }

  const update = {
    cover: {
      url: imageUrl,
      publicID: imagePublicID
    },
  };

  const result = await User.findByIdAndUpdate(userID, update, { new: true }).exec();

  res.json(new Response(true, result, 'User cover updated', null));
});

exports.user_activity_get = asyncHandler(async (req, res) => {
  const { userID } = req.params;

  const activities = await Activity.find({ for: userID }).sort({ date: -1 }).exec();

  res.json(new Response(true, activities, 'User activity gathered', null));
});

exports.user_activity_update = asyncHandler(async (req, res) => {
  const { activityID } = req.params;
  const { seen } = req.body;

  const result = await Activity.findByIdAndUpdate(activityID, { seen: seen }, { new: true }).exec();

  res.json(new Response(true, result, 'User activity update', null));
});

exports.user_request_send = asyncHandler(async (req, res) => {
  const { userID } = req.params;

  const result = await User.findByIdAndUpdate(userID, { $addToSet: { friendRequests: req.user._id } }, { new: true }).exec();

  res.json(new Response(true, result, 'Request sent', null));
});
