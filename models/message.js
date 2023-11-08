const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  text: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Virtual for URL
MessageSchema.virtual('url').get(function () {
  return `/placeholder/${this._id}`;
});

// Virtual for formatted timestamp
MessageSchema.virtual('timestamp_formatted').get(function () {
  // We don't use an arrow function as we'll need the this object
  return DateTime.fromJSDate(this.timestamp).toLocaleString(
    DateTime.DATETIME_MED
  );
});

module.exports = mongoose.model('Message', MessageSchema);
