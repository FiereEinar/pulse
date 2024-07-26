const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const auth = require('../middlewares/auth');

const {
  user_get,
  users_get,
  user_update,
  user_update_cover,
  user_activity_get,
  user_activity_update,
  user_request_send,
  user_request_accept,
} = require('../controllers/userController');
const { user_update_validation } = require('../middlewares/validations');

// GET USERS
router.get('/', auth, users_get);

// GET USER BY ID
router.get('/:userID', auth, user_get);

// UPDATE USER
router.put(
  '/:userID',
  auth,
  upload.single('image'),
  user_update_validation,
  user_update
);

// UPDATE USER COVER PHOTO
router.put('/:userID/cover', auth, upload.single('image'), user_update_cover);

// GET USER ACTIVITY/NOTIFICATIONS
router.get('/:userID/activity', auth, user_activity_get);

// SEND REQUEST TO A USER
router.post('/:userID/request', auth, user_request_send);

// ACCEPT REQUEST TO A USER
router.post('/:userID/request/accept', auth, user_request_accept);

// UPDATE USER ACTIVITY/NOTIFICATIONS
router.put('/:userID/activity/:activityID', auth, user_activity_update);

module.exports = router;
