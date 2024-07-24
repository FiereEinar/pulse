const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const {
  signup,
  login,
  check_auth,
  logout
} = require('../controllers/authController');
const { signup_validation, login_validation } = require('../middlewares/validations');

router.post('/signup', signup_validation, signup);
router.post('/login', login_validation, login);

router.get('/check_auth', check_auth);
router.get('/logout', logout);

module.exports = router;
