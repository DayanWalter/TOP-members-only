const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const message_controller = require('../controllers/messageController');

/// USER ///
// GET home page
router.get('/', user_controller.index);
// GET Signup
router.get('/signup', user_controller.sign_up_get);
// POST Signup
router.post('/signup', user_controller.sign_up_post);
// GET Signin
router.get('/signin', user_controller.sign_in_get);
// POST Signin
router.post('/signin', user_controller.sign_in_post);
// Log-Out
router.get('/logout', user_controller.log_out);
// Logged In
router.get('/loggedin', user_controller.logged_in);
// GET Change Status
router.get('/changestatus', user_controller.change_status_get);
// POST Change Status
router.post('/changestatus', user_controller.change_status_post);

/// MESSAGE ///
router.get('/messages', message_controller.index);
// GET Message
router.get('/new', message_controller.new_message_get);
// POST Message
router.post('/new', message_controller.new_message_post);
// GET Delete Message
router.get('/delete/:id', message_controller.message_delete_get);
// POST Delete Message
router.post('/delete/:id', message_controller.message_delete_post);

module.exports = router;
