const asyncHandler = require('express-async-handler');

exports.signup_get = asyncHandler(async (req, res) => {
  res.json({ success: true, message: 'Sign up successfull' });
});

exports.login_get = asyncHandler(async (req, res) => {
  res.json({ success: true, message: 'Log in successfull' });
});
