const express = require('express');
const router = express.Router();
const passport = require('../utils/passport');
const upload = require('../utils/multer');

const {
  user_get,
  users_get,
  user_update,
  user_update_cover,
  user_activity_get,
  user_activity_update,
  user_request_send,
  user_request_accept
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

// GET USER ACTIVITY/NOTIFICATIONS
router.get('/:userID/activity',
  passport.authenticate('jwt', { session: false }),
  user_activity_get
);

// SEND REQUEST TO A USER
router.post('/:userID/request',
  passport.authenticate('jwt', { session: false }),
  user_request_send
);

// ACCEPT REQUEST TO A USER
router.post('/:userID/request/accept',
  passport.authenticate('jwt', { session: false }),
  user_request_accept
);

// UPDATE USER ACTIVITY/NOTIFICATIONS
router.put('/:userID/activity/:activityID',
  passport.authenticate('jwt', { session: false }),
  user_activity_update
);

module.exports = router;
