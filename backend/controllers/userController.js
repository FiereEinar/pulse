const asyncHandler = require('express-async-handler');
const Response = require('../utils/response');
const User = require('../models/user');

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
