const asyncHandler = require("express-async-handler");
const Response = require('../utils/response');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const { serverlessImageUpload } = require("../utils/uploader");
const cloudinary = require('../utils/cloudinary');

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


exports.like_post = asyncHandler(async (req, res) => {
  const { postID, userID } = req.params;

  const result = await Post.findByIdAndUpdate(
    postID,
    { $addToSet: { likes: userID } },
    { new: true }
  ).exec();

  res.json(new Response(true, result, 'Post liked', null));
});

exports.like_delete = asyncHandler(async (req, res) => {
  const { postID, userID } = req.params;

  const result = await Post.findByIdAndUpdate(
    postID,
    { $pull: { likes: userID } },
    { new: true }
  ).exec();

  res.json(new Response(true, result, 'Post unliked', null));
});

exports.post_comment_create = asyncHandler(async (req, res) => {
  const { postID } = req.params;
  const { commenterID, content } = req.body;

  let imageUrl = '';
  let imagePublicID = '';

  if (req.file) {
    const result = await serverlessImageUpload(req.file.buffer);

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

  res.json(new Response(true, { comment, result }, 'Comment posted on a post', null));
});

exports.post_comment_like_create = asyncHandler(async (req, res) => {
  const { commentID, userID } = req.params;

  const result = await Comment.findByIdAndUpdate(
    commentID,
    { $addToSet: { likes: userID } },
    { new: true }
  ).exec();

  res.json(new Response(true, result, 'Like sent to a comment', null));
});

exports.post_comment_like_delete = asyncHandler(async (req, res) => {
  const { commentID, userID } = req.params;

  const result = await Comment.findByIdAndUpdate(
    commentID,
    { $pull: { likes: userID } },
    { new: true }
  ).exec();

  res.json(new Response(true, result, 'Like removed to a comment', null));
});


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

exports.post_delete = asyncHandler(async (req, res) => {
  const { postID } = req.params;

  const result = await Post.findByIdAndDelete(postID);

  if (result?.image?.publicID) {
    await cloudinary.uploader.destroy(result.image.publicID)
  }

  res.json(new Response(true, result, 'Post deleted', null));
});
