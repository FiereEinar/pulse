const asyncHandler = require("express-async-handler");
const Response = require('../utils/response');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const { serverlessImageUpload } = require("../utils/uploader");
const cloudinary = require('../utils/cloudinary');
const Activity = require("../models/activity");

/**
 * get all posts
 */
exports.posts_get = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .populate({
      path: 'creator',
      select: '-password'
    })
    .sort({ dateCreated: -1 })
    .exec();

  res.json(new Response(true, posts, 'Posts gathered', null));
});

/**
 * fetch the posts of a user including shared posts
 */
exports.user_posts_get = asyncHandler(async (req, res) => {
  const { userID } = req.params;

  const posts = await Post.find({
    $or: [{ creator: userID }, { shares: userID }]
  })
    .populate({
      path: 'creator',
      select: '-password'
    })
    .sort({ dateCreated: -1 })
    .exec();

  res.json(new Response(true, posts, 'User posts gathered', null));
});

/**
 * fetch a post by ID
 */
exports.post_id_get = asyncHandler(async (req, res) => {
  const { postID } = req.params;

  const post = await Post.findById(postID)
    .populate({
      path: 'creator',
      select: '-password'
    })
    .populate({
      path: 'likes',
      select: '-password'
    })
    .populate({
      path: 'shares',
      select: '-password'
    })
    .populate({
      path: 'comments',
      populate: {
        path: 'commenter',
        select: '-password'
      }
    })
    .exec();

  res.json(new Response(true, post, 'Post data gathered', null));
});

/**
 * create a post
 */
exports.post_post = asyncHandler(async (req, res) => {
  const { creatorID, content } = req.body;

  let imgUrl = '';
  let imgPublicID = '';

  if (req.file) {
    const result = await serverlessImageUpload(req.file.buffer, 'posts');

    imgUrl = result.secure_url;
    imgPublicID = result.public_id;
  }

  const post = new Post({
    creator: creatorID,
    content: content,
    image: {
      url: imgUrl,
      publicID: imgPublicID
    },
  });

  await post.save();

  res.json(new Response(true, post, 'Posts created', null));
});

/** 
 * create a comment on a post
 */
exports.post_comment_create = asyncHandler(async (req, res) => {
  const { postID } = req.params;
  const { commenterID, content } = req.body;

  const commenter = await User.findById(commenterID);
  if (!commenter) {
    return res.status(404).json(new Response(false, null, 'User not found', null));
  }

  let imageUrl = '';
  let imagePublicID = '';

  if (req.file) {
    const result = await serverlessImageUpload(req.file.buffer, 'comments');

    imageUrl = result.secure_url;
    imagePublicID = result.public_id;
  }

  const comment = new Comment({
    commenter: commenterID,
    content: content,
    image: {
      url: imageUrl,
      publicID: imagePublicID
    },
  });

  await comment.save();

  const result = await Post.findByIdAndUpdate(
    postID,
    { $push: { comments: comment._id } },
    { new: true }
  ).exec();

  const activity = new Activity({
    message: `${commenter.firstname} commented on your post`,
    associatedID: result._id,
    image: commenter.profile.url,
    type: 'post',
    for: result.creator
  });

  await activity.save();

  res.json(new Response(true, { comment, result }, 'Comment posted on a post', null));
});

/**
 * toggle a like on a post
 */
exports.post_like_toggle = asyncHandler(async (req, res) => {
  const { postID } = req.params;

  const post = await Post.findById(postID);
  if (!post) {
    return res.status(404).json(new Response(false, null, 'Post not found', null));
  }

  const isLiked = post.likes.includes(req.user._id);

  if (isLiked) {
    post.likes.pull(req.user._id);
  } else {
    post.likes.push(req.user._id);

    const activity = new Activity({
      message: `${req.user.firstname} liked your post`,
      associatedID: post._id,
      image: req.user.profile.url,
      type: 'post',
      for: post.creator
    });

    await activity.save();
  }

  await post.save();

  res.json(new Response(true, null, 'Post liked', null));
});

/**
 * toggle a like on a comment
 */
exports.post_comment_like_toggle = asyncHandler(async (req, res) => {
  const { commentID, postID } = req.params;

  const post = await Post.findById(postID);
  const comment = await Comment.findById(commentID);
  if (!comment) {
    return res.status(404).json(new Response(false, null, 'Comment not found', null));
  }

  const isLiked = comment.likes.includes(req.user._id);

  if (isLiked) {
    comment.likes.pull(req.user._id);
  } else {
    comment.likes.push(req.user._id);

    const activity = new Activity({
      message: `${req.user.firstname} liked your comment`,
      associatedID: post._id,
      image: req.user.profile.url,
      type: 'post',
      for: comment.commenter
    });

    await activity.save();
  }

  await comment.save();

  res.json(new Response(true, null, 'Comment liked', null));
});

/**
 * delete a comment on a post
 */
exports.post_comment_delete = asyncHandler(async (req, res) => {
  const { postID, commentID } = req.params;

  const result = await Comment.findByIdAndDelete(commentID);

  if (result?.image?.publicID) {
    await cloudinary.uploader.destroy(result.image.publicID)
  }

  const updatedPost = await Post.findByIdAndUpdate(
    postID,
    { $pull: { comments: commentID } },
    { new: true }
  ).exec();

  res.json(new Response(true, { result, updatedPost }, 'Comment removed', null));
});

/**
 * update a comment
 */
exports.post_comment_update = asyncHandler(async (req, res) => {
  const { commentID } = req.params;
  const { commenterID, content } = req.body;

  const update = {
    content: content,
    edited: true
  }

  const updatedComment = await Comment.findOneAndUpdate(
    { _id: commentID, commenter: commenterID },
    update,
    { new: true }
  ).exec();

  res.json(new Response(true, updatedComment, 'Comment updated', null));
});

/**
 * update a post
 */
exports.post_update = asyncHandler(async (req, res) => {
  const { postID } = req.params;
  const { content } = req.body;

  const update = {
    content: content,
    edited: true
  };

  const result = await Post.findByIdAndUpdate(postID, update, { new: true }).exec();

  res.json(new Response(true, result, 'Post updated', null));
});

/**
 * delete a post
 */
exports.post_delete = asyncHandler(async (req, res) => {
  const { postID } = req.params;

  const result = await Post.findByIdAndDelete(postID);

  if (result?.image?.publicID) {
    await cloudinary.uploader.destroy(result.image.publicID)
  }

  res.json(new Response(true, result, 'Post deleted', null));
});

/**
 * toggle a share on a post
 */
exports.post_share_toggle = asyncHandler(async (req, res) => {
  const { postID } = req.params;

  const post = await Post.findById(postID);
  if (!post) {
    return res.status(404).json(new Response(false, null, 'Post not found', null));
  }

  const isShared = post.shares.includes(req.user._id);

  if (isShared) {
    post.shares.pull(req.user._id);
  } else {
    post.shares.push(req.user._id);
  }

  await post.save();

  res.json(new Response(true, null, 'Post shared', null));
});
