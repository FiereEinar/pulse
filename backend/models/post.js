const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  shares: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  content: { type: String, minLength: 1 },
  image: {
    url: String,
    publicID: String
  },
  dateCreated: { type: Date, default: Date.now },
  edited: { type: Boolean, default: false },
});

module.exports = mongoose.model('Post', PostSchema);
