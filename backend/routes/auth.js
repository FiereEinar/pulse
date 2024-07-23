const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const {
  signup_get,
  login_get,
  check_auth
} = require('../controllers/authController');
const { signup_validation, login_validation } = require('../middlewares/validations');

router.post('/signup', signup_validation, signup_get);
router.post('/login', login_validation, login_get);

router.get('/check_auth', login_validation, check_auth);

module.exports = router;
