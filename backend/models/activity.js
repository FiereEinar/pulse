const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  associatedID: { type: String, required: true },
  for: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: String,
  image: String,
  type: { type: String, enum: ['post', 'user'] },
  seen: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Activity', ActivitySchema);
