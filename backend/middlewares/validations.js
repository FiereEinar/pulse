const { body } = require('express-validator');

exports.signup_validation = [
  body('firstname', 'First name should not be empty and 30 characters max')
    .trim()
    .isLength({ min: 1, max: 30 }),

  body('lastname', 'Last name should not be empty and 30 characters max')
    .trim()
    .isLength({ min: 1, max: 30 }),

  body('username', 'Username should not be empty and 20 characters max')
    .trim()
    .isLength({ min: 1, max: 20 }),

  body('password', 'Password should be 5 characters min and 20 characters max')
    .trim()
    .isLength({ min: 5, max: 20 }),

];

exports.login_validation = [
  body('username', 'Username should not be empty and 20 characters max')
    .trim()
    .isLength({ min: 1, max: 20 }),

  body('password', 'Password should be 5 characters min and 20 characters max')
    .trim()
    .isLength({ min: 5, max: 20 }),

];

exports.post_content_validation = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 1001 }).withMessage('Content must be between 1 and 1000 characters')
    .escape(),

];

exports.user_update_validation = [
  body('firstname', 'First name should not be empty and 30 characters max')
    .trim()
    .isLength({ min: 1, max: 30 }),

  body('lastname', 'Last name should not be empty and 30 characters max')
    .trim()
    .isLength({ min: 1, max: 30 }),

  body('username', 'Username should not be empty and 20 characters max')
    .trim()
    .isLength({ min: 1, max: 20 }),

  body('bio', 'bio must be below 300 characters ')
    .trim()
    .isLength({ max: 300 }),

];
