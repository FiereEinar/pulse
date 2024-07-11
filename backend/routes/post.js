const express = require('express');
const router = express.Router();
const passport = require('../utils/passport');
const upload = require('../utils/multer');

const {
  posts_get,
  post_id_get,
  post_post,
  like_post,
  like_delete
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

router.post('/:postID/:userID/like',
  passport.authenticate('jwt', { session: false }),
  like_post
);

router.delete('/:postID/:userID/like',
  passport.authenticate('jwt', { session: false }),
  like_delete
);

module.exports = router;
