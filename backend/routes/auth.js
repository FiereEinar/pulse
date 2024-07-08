const express = require('express');
const router = express.Router();

const {
  signup_get,
  login_get
} = require('../controllers/auth');

router.get('/signup', signup_get);
router.get('/login', login_get);

module.exports = router;
