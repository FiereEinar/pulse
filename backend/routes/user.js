const express = require('express');
const router = express.Router();
const passport = require('../utils/passport');
const upload = require('../utils/multer');

const {
  user_get,
  users_get,
  user_update,
  user_update_cover
} = require('../controllers/userController');

// GET USERS
router.get('/',
  passport.authenticate('jwt', { session: false }),
  users_get
);

// GET USER BY ID
router.get('/:userID',
  passport.authenticate('jwt', { session: false }),
  user_get
);

// UPDATE USER
router.put('/:userID',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  user_update
);

// UPDATE USER COVER PHOTO
router.put('/:userID/cover',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  user_update_cover
);

module.exports = router;
