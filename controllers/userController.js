const User = require('../models/user');
const Message = require('../models/message');

const bcrypt = require('bcryptjs');
const passport = require('passport');

const { body, validationResult } = require('express-validator');

const asyncHandler = require('express-async-handler');

// Display index
exports.index = asyncHandler(async (req, res, next) => {
  res.render('index', {
    title: 'Members Only Home',
    user: req.user,
  });
});
// Display Sign Up
exports.sign_up_get = asyncHandler(async (req, res, next) => {
  res.render('sign_up', {
    title: 'Please Sign Up',
    errors: '',
  });
});

// Sign-Up POST
exports.sign_up_post = [
  // Validate and sanitize fields
  body('first_name', 'First Name must not be empty')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('last_name', 'Last Name must not be empty')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('username', 'Username to short(min 3)/long(max 15)')
    .trim()
    .isLength({ min: 3, max: 15 })
    .escape(),
  body('password', 'Password too short(min 3)').isLength({
    min: 3,
  }),
  body('confirmpassword', "Passwords aren't the same").custom(
    (value, { req }) => {
      return value === req.body.password;
    }
  ),
  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const result = validationResult(req);

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: hashedPassword,
        status: req.body.status,
      });
      if (result.isEmpty()) {
        // Save user to DB if no result
        await user.save();
        res.redirect('/signin');
      } else {
        // Display every error separately
        result.array().map((error) => console.log(error.msg));
        // console.log(result.array());
        res.render('sign_up', {
          title: 'Please change input',
          errors: result.array(),
          user,
        });
      }
    });
  }),
];

// Display Sign-In
exports.sign_in_get = asyncHandler(async (req, res, next) => {
  res.render('sign_in', {
    title: 'Please Sign In',
    errors: '',
  });
});
// Sign-In POST
exports.sign_in_post = passport.authenticate('local', {
  successRedirect: '/loggedin',
  failureRedirect: '/signin',
});
// Log-Out
exports.log_out = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
// Logged In
exports.logged_in = asyncHandler(async (req, res, next) => {
  res.render('logged_in', { title: 'Welcome!', user: req.user });
});
