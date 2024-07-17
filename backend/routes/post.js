const express = require('express');
const router = express.Router();
const passport = require('../utils/passport');
const upload = require('../utils/multer');

const {
  posts_get,
  post_id_get,
  post_post,
  post_comment_create,
  post_comment_update,
  post_comment_delete,
  post_update,
  post_delete,
  user_posts_get,
  post_share_toggle,
  post_like_toggle,
  post_comment_like_toggle
} = require('../controllers/postController');

// GET POSTS
router.get('/',
  passport.authenticate('jwt', { session: false }),
  posts_get
);

// GET USER POSTS
router.get('/user/:userID',
  passport.authenticate('jwt', { session: false }),
  user_posts_get
);

// CREATE A POST
router.post('/',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  post_post
);

// GET POST BY ID
router.get('/:postID',
  passport.authenticate('jwt', { session: false }),
  post_id_get
);

// UPDATE POST BY ID
router.put('/:postID',
  passport.authenticate('jwt', { session: false }),
  post_update
);

// DELETE POST BY ID
router.delete('/:postID',
  passport.authenticate('jwt', { session: false }),
  post_delete
);

// CREATE A COMMENT ON A POST
router.post('/:postID/comment',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  post_comment_create
);

// SHARE A POST
router.put('/:postID/share',
  passport.authenticate('jwt', { session: false }),
  post_share_toggle
);

// LIKE A POST
router.put('/:postID/like',
  passport.authenticate('jwt', { session: false }),
  post_like_toggle
);

// UPDATE A COMMENT ON A POST
router.put('/:postID/comment/:commentID',
  passport.authenticate('jwt', { session: false }),
  post_comment_update
);

// DELETE A COMMENT ON A POST
router.delete('/:postID/comment/:commentID',
  passport.authenticate('jwt', { session: false }),
  post_comment_delete
);

// SEND A LIKE TO A COMMENT ON A POST
router.put('/:postID/comment/:commentID/like',
  passport.authenticate('jwt', { session: false }),
  post_comment_like_toggle
);

module.exports = router;
