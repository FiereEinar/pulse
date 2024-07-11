const express = require('express');
const router = express.Router();
const passport = require('../utils/passport');
const upload = require('../utils/multer');

const {
  posts_get,
  post_id_get,
  post_post,
} = require('../controllers/postController');

router.get('/',
  passport.authenticate('jwt', { session: false }),
  posts_get
);

router.get('/:postID',
  passport.authenticate('jwt', { session: false }),
  post_id_get
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  post_post
);

module.exports = router;
