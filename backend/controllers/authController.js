const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const Response = require('../utils/response');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * POST - JWT USER SIGNUP
 */
exports.signup = asyncHandler(async (req, res) => {
  const { firstname, lastname, username, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(new Response(false, null, 'Error in sign up validation', errors.array()[0].msg))
  }

  const existingUser = await User.findOne({ username: username }).exec();
  if (existingUser) {
    return res.json(new Response(false, null, 'Username already exists', 'Username already exists'))
  }

  const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT))

  const user = new User({
    firstname: firstname.toLowerCase(),
    lastname: lastname.toLowerCase(),
    username: username.toLowerCase(),
    password: hashedPassword,
    profile: {
      url: '',
      publicID: ''
    },
    cover: {
      url: '',
      publicID: ''
    },
  });

  await user.save();

  res.json(new Response(true, user, 'Sign up successfull', null));
});

/**
 * POST - JWT USER LOGIN
 */
exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(new Response(false, null, 'Error in log in validation', errors.array()[0].msg))
  }

  const user = await User.findOne({ username: username }).exec();
  if (!user) {
    return res.json(new Response(false, null, 'Invalid username', 'Invalid username'));
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.json(new Response(false, null, 'Invalid password', 'Invalid password'));
  }

  const token = jwt.sign(
    { userID: user._id, username: user.username },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '1d' }
  );

  user.token = token;
  await user.save();

  res.cookie('pulse_jwt', token, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000   // 1 day
  });

  res.json(new Response(true, { userID: user._id }, 'Log in successfull', null));
});

/**
 * GET - CHECK IF AUTHENTICATED / COOKIES ARE SET
 */
exports.check_auth = asyncHandler(async (req, res) => {
  const token = req.cookies.pulse_jwt;

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(401);
  }
});

/**
 * GET - LOGOUT
 */
exports.logout = asyncHandler(async (req, res) => {
  const token = req.cookies?.pulse_jwt;
  if (!token) {
    return res.sendStatus(204)
  }

  const user = await User.findOne({ token: token }).exec();
  if (!user) {
    res.clearCookie('pulse_jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });

    return res.sendStatus(204);
  }

  user.token = '';
  await user.save();

  res.clearCookie('pulse_jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });

  res.sendStatus(204);
});
