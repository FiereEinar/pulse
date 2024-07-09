const express = require('express');
const router = express.Router();

const {
  signup_get,
  login_get
} = require('../controllers/authController');
const { signup_validation, login_validation } = require('../utils/validations');

router.post('/signup', signup_validation, signup_get);
router.post('/login', login_validation, login_get);

module.exports = router;
