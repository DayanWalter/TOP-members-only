const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, minLength: 1, maxLength: 10 },
  last_name: { type: String, required: true, minLength: 1, maxLength: 10 },
  username: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 15,
    unique: true,
  },
  password: { type: String, required: true },
  status: {
    type: String,
    enum: ['Visitor', 'Member', 'Admin'],
    default: 'Visitor',
  },
});

// Virtual for URL
UserSchema.virtual('url').get(function () {
  return `/user/${this._id}`;
});

// Virtual for fullname
UserSchema.virtual('fullname').get(function () {
  // To avoid errors in cases where an user does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  let fullname = '';
  if (this.first_name && this.last_name) {
    fullname = `${this.last_name}, ${this.first_name}`;
  }
  return fullname;
});

module.exports = mongoose.model('User', UserSchema);
