require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler(async (req, res, next) => {
  const cookie = req.cookies;

  // no cookies
  if (!cookie?.pulse_jwt) return res.sendStatus(401)

  jwt.verify(cookie.pulse_jwt, process.env.JWT_SECRET_KEY, async (err, data) => {
    if (err) return res.sendStatus(403);

    const user = await User.findById(data.userID)
    if (!user) return res.sendStatus(403);

    req.user = user;
    next();
  });
});
