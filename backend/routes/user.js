const express = require('express');
const router = express.Router();
const passport = require('../utils/passport');

const {
  user_get,
  users_get
} = require('../controllers/userController');

/**
 * GET USERS
 */
router.get('/', passport.authenticate('jwt', { session: false }), users_get);

/**
 * GET USER BY ID
 */
router.get('/:userID', passport.authenticate('jwt', { session: false }), user_get);

module.exports = router;
