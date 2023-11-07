const User = require('../models/user');
const Message = require('../models/message');

const bcrypt = require('bcryptjs');

const { body, validationResult } = require('express-validator');

const asyncHandler = require('express-async-handler');

// Display index
exports.index = asyncHandler(async (req, res, next) => {
  res.render('index', {
    title: 'Members Only Home',
  });
});
// Display Sign Up
exports.sign_up_get = asyncHandler(async (req, res, next) => {
  res.render('sign_up', {
    title: 'Please Sign Up',
  });
});

// Sign-Up POST
exports.sign_up_post = asyncHandler(async (req, res, next) => {
  // Extract the validation errors from a request.

  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    try {
      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: hashedPassword,
        status: req.body.status,
      });

      await user.save();
      res.redirect('/');
    } catch (err) {
      return next(err);
    }
  });
});
