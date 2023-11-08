const User = require('../models/user');
const Message = require('../models/message');

const bcrypt = require('bcryptjs');
const passport = require('passport');

const { body, validationResult } = require('express-validator');

const asyncHandler = require('express-async-handler');

// Display Message List
exports.index = asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find().populate('user').exec();

  res.render('messages', {
    title: 'Messages',
    message_list: allMessages,
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
// POST new Message
exports.new_message_post = [
  body('title', 'Title must not be empty').isLength({ max: 30 }).escape(),
  body('text', 'Text must not be empty')
    .isLength({ min: 5, max: 200 })
    .escape(),

  // Process after validation and sanitization
  asyncHandler(async (req, res, next) => {
    const result = validationResult(req);

    const message = new Message({
      title: req.body.title,
      timestamp: new Date().toLocaleString('en-US'),
      text: req.body.text,
      user: req.user.id,
    });
    if (result.isEmpty()) {
      await message.save();
      res.redirect('/messages');
    }
  }),
];
