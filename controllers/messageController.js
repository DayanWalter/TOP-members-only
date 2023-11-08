const User = require('../models/user');
const Message = require('../models/message');

const bcrypt = require('bcryptjs');
const passport = require('passport');

const { body, validationResult } = require('express-validator');

const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
  res.render('messages', {
    title: 'Messages',
    user: req.user,
  });
});
// Display new Message
exports.new_message_get = asyncHandler(async (req, res, next) => {
  res.render('message', {
    title: 'New Message',
    user: req.user,
  });
});
