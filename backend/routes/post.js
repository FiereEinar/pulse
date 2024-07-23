const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const auth = require('../middlewares/auth');

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
  auth,
  posts_get
);

// GET USER POSTS
router.get('/user/:userID',
  auth,
  user_posts_get
);

// CREATE A POST
router.post('/',
  auth,
  upload.single('image'),
  post_post
);

// GET POST BY ID
router.get('/:postID',
  auth,
  post_id_get
);

// UPDATE POST BY ID
router.put('/:postID',
  auth,
  post_update
);

// DELETE POST BY ID
router.delete('/:postID',
  auth,
  post_delete
);

// CREATE A COMMENT ON A POST
router.post('/:postID/comment',
  auth,
  upload.single('image'),
  post_comment_create
);

// SHARE A POST
router.put('/:postID/share',
  auth,
  post_share_toggle
);

// LIKE A POST
router.put('/:postID/like',
  auth,
  post_like_toggle
);

// UPDATE A COMMENT ON A POST
router.put('/:postID/comment/:commentID',
  auth,
  post_comment_update
);

// DELETE A COMMENT ON A POST
router.delete('/:postID/comment/:commentID',
  auth,
  post_comment_delete
);

// SEND A LIKE TO A COMMENT ON A POST
router.put('/:postID/comment/:commentID/like',
  auth,
  post_comment_like_toggle
);

module.exports = router;
